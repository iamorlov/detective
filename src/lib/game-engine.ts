import { GrokClient } from './grok-client';
import { GameState, Message } from '@/types/game';

export class GameEngine {
  private grokClient: GrokClient;
  private gameState: GameState | null = null;

  constructor(apiKey: string) {
    this.grokClient = new GrokClient(apiKey);
  }

  async startNewGame(): Promise<GameState> {
    try {
      const mysteryData = await this.grokClient.generateMystery();
      const parsedData = JSON.parse(mysteryData);

      this.gameState = {
        id: Date.now().toString(),
        ...parsedData,
        currentPhase: 'intro',
        conversations: [],
      };

      return this.gameState!;
    } catch (error) {
      console.error('Failed to start new game:', error);
      throw new Error('Failed to generate mystery. Please try again.');
    }
  }

  async askCharacter(characterId: string, question: string): Promise<Message> {
    if (!this.gameState) {
      throw new Error('No active game');
    }

    const character = this.gameState.characters.find(c => c.id === characterId);
    if (!character) {
      throw new Error('Character not found');
    }

    let conversation = this.gameState.conversations.find(c => c.characterId === characterId);
    if (!conversation) {
      conversation = { characterId, messages: [] };
      this.gameState.conversations.push(conversation);
    }

    // Add player question
    const playerMessage: Message = {
      speaker: 'player',
      content: question,
      timestamp: new Date(),
    };
    conversation.messages.push(playerMessage);

    // Get character response
    const conversationHistory = conversation.messages.map(m => 
      `${m.speaker}: ${m.content}`
    );

    const { response, isLie } = await this.grokClient.getCharacterResponse(
      character,
      question,
      conversationHistory
    );

    const characterMessage: Message = {
      speaker: 'character',
      content: response,
      timestamp: new Date(),
      isLie,
    };
    conversation.messages.push(characterMessage);

    return characterMessage;
  }

  makeAccusation(characterId: string): { success: boolean; message: string } {
    if (!this.gameState) {
      return { success: false, message: 'No active game' };
    }

    const accusedCharacter = this.gameState.characters.find(c => c.id === characterId);
    if (!accusedCharacter) {
      return { success: false, message: 'Character not found' };
    }

    if (accusedCharacter.isKiller) {
      this.gameState.currentPhase = 'won';
      return { 
        success: true, 
        message: `Correct! ${accusedCharacter.name} was indeed the killer. You solved the mystery!` 
      };
    } else {
      this.gameState.currentPhase = 'lost';
      const killer = this.gameState.characters.find(c => c.isKiller);
      return { 
        success: false, 
        message: `Wrong! ${accusedCharacter.name} was innocent. The real killer was ${killer?.name}. Game over.` 
      };
    }
  }

  getGameState(): GameState | null {
    return this.gameState;
  }

  startInvestigation(): void {
    if (!this.gameState) {
      throw new Error('No active game. Please start a new game first.');
    }
    
    this.gameState.currentPhase = 'investigation';
  }
}