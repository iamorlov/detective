import { Character } from '@/types/game';

interface GrokAPIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class GrokClient {
  private apiKey: string;
  private baseUrl = 'https://api.x.ai/v1';
  private model = 'grok-3-mini';
  private maxTokens = 5000;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateMystery(): Promise<any> {
    const prompt = `Generate a murder mystery game with the following structure:
    
    1. Setting: an intriguing and cinematic combination of time and mesia for the crime. For example, a Hotel in New Ork in the 1960s, or a steamboat on the Nile in 1917, or a Restaurant in a Dubai skyscraper in the present day, or a ski resort in the Alps in the 2000s. Then consider the era chosen
    2. Create a victim and murder details (weapon, location, time)
    3. Generate 6-9 witnesses/suspects, one of whom is the killer
    4. Each character needs: id (generate unique string), name, age, occupation, description, backstory, alibi, connections (array of other character names), isKiller (boolean - only one should be true)
    5. Create logical connections between characters
    6. The killer's alibi should have subtle lies/inconsistencies
    
    Return ONLY valid JSON with this exact structure:
    {
      "setting": "string",
      "victim": "string", 
      "murderWeapon": "string",
      "murderLocation": "string",
      "murderTime": "string",
      "backstory": "string",
      "characters": [
        {
          "id": "string",
          "name": "string",
          "age": number,
          "occupation": "string",
          "description": "string",
          "backstory": "string",
          "alibi": "string",
          "connections": ["string"],
          "isKiller": boolean
        }
      ]
    }`;

    const result = await this.makeRequest(prompt);
    try {

      return result;
    } catch (error) {
      console.error('Failed to parse mystery data:', error);
      throw new Error('Failed to generate valid mystery data');
    }
  }

  async getCharacterResponse(
    character: Character,
    playerQuestion: string,
    conversationHistory: string[]
  ): Promise<{ response: string; isLie: boolean }> {
    const prompt = `You are ${character.name}, a ${character.occupation}.
    
    Character details:
    - Age: ${character.age}
    - Description: ${character.description}
    - Backstory: ${character.backstory}
    - Alibi: ${character.alibi}
    - Is killer: ${character.isKiller}
    - Connections: ${character.connections.join(', ')}
    
    Rules:
    - If you're NOT the killer, always tell the truth
    - If you ARE the killer, you may lie to protect yourself, but be subtle
    - Stay in character with your personality and background
    - Reference your connections to other characters when relevant
    - Keep responses conversational and realistic
    - If lying, make it subtle - don't contradict yourself too obviously
    
    Previous conversation: ${conversationHistory.join('\n')}
    
    Player asks: "${playerQuestion}"
    
    Respond as this character would, and indicate if this response contains a lie.
    Return ONLY valid JSON in this format: {"response": "your response here", "isLie": true/false}`;

    const result = await this.makeRequest(prompt);
    try {
      const parsed = JSON.parse(result);
      return {
        response: parsed.response || result,
        isLie: parsed.isLie || false
      };
    } catch (error) {
      console.error('Failed to parse character response:', error);
      return { response: result, isLie: false };
    }
  }

  private async makeRequest(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a creative AI assistant helping create an interactive murder mystery game. Always return valid JSON when requested.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.maxTokens,
          stream: false, 
          stop: null,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Grok API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: GrokAPIResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Grok API request failed:', error);
      throw error;
    }
  }
}