import { Character } from '@/types/game';
import { I18n } from './i18n';

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
  private maxTokens = 6000;
  private i18n: I18n;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.i18n = I18n.getInstance();
  }

   private getLanguageInstruction(): string {
    const currentLang = this.i18n.getCurrentLanguage();
    switch (currentLang) {
      case 'ru':
        return 'Отвечай ТОЛЬКО на Русском языке. Весь контент должен быть на Русском языке.';
      case 'uk':
        return 'Відповідай ТІЛЬКИ українською мовою. Весь контент повинен бути Українською мовою.';
      case 'es':
        return 'Responde SOLAMENTE en español. Todo el contenido debe estar en español.';
      default:
        return 'Respond ONLY in English language. All content must be in English.';
    }
  }

  private getDetectiveName(): string {
    const currentLang = this.i18n.getCurrentLanguage();
    switch (currentLang) {
      case 'ru':
        return 'детектив';
      case 'uk':
        return 'детектив';
      case 'es':
        return 'detective';
      default:
        return 'detective';
    }
  }

  async generateMystery(): Promise<any> {
    const languageInstruction = this.getLanguageInstruction();

    const prompt = `${languageInstruction}

Generate a murder mystery game with the following structure:
    
    1. Setting: an intriguing and cinematic combination of time and mesia for the crime. For example, a Hotel in New Ork in the 1960s, or a steamboat on the Nile in 1917, or a Restaurant in a Dubai skyscraper in the present day, or a ski resort in the Alps in the 2000s. Then consider the era chosen
    2. Create a victim and murder details (weapon, location, time)
    3. Generate 7  witnesses/suspects, one of whom is the killer
    4. Each character needs: id (generate unique string), name, age, occupation, description, backstory, alibi, connections (array of other character names), isKiller (boolean - only one should be true)
    5. Make backstory detailed and well described. 5-10 lines
    6. Make 'setting' not too long, up to 100-120 characters maximum
    7. Create logical connections between characters
    8. Use names according to the location
    9. The killer's alibi should have subtle lies/inconsistencies
    10. Try to give an answer that is no longer than 5,500 tokens
    
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
    const languageInstruction = this.getLanguageInstruction();
    const detectiveName = this.getDetectiveName();

    const prompt = `${languageInstruction}

You are ${character.name}, a ${character.occupation}.
    
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
    - Highlight keywords (time, event, alibi, witnesses...) in your response that may be considered important for the investigation: make it bold
    - Do not highlite '${detectiveName}' in your response
    - Use short sentences and natural language
    - Use a tone that matches your character's personality
    - Name the person asking the question - ${detectiveName}
    - With very little chance, when you tell the truth, you may be slightly mistaken or forget something
    
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
    const languageInstruction = this.getLanguageInstruction();

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
              content: `You are a creative AI assistant helping create an interactive murder mystery game. Always return valid JSON when requested. ${languageInstruction}`
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