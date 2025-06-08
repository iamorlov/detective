import { GrokClient } from './grok-client';
import { GameState, Message } from '@/types/game';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  level: DifficultyLevel;
  suspectCount: number;
  label: string;
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: { level: 'easy', suspectCount: 3, label: 'Easy' },
  medium: { level: 'medium', suspectCount: 5, label: 'Medium' },
  hard: { level: 'hard', suspectCount: 7, label: 'Hard' }
};

export class GameEngine {
  private gameState: GameState | null = null;
  private grokClient: GrokClient;
  private static readonly STORAGE_KEY = 'detective-game-state';

  constructor() {
    this.grokClient = new GrokClient(process.env.NEXT_PUBLIC_GROK_API_KEY || '');
    this.loadGameState();
  }

  private saveGameState(): void {
    if (this.gameState && typeof window !== 'undefined') {
      try {
        localStorage.setItem(GameEngine.STORAGE_KEY, JSON.stringify(this.gameState));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    }
  }

  private loadGameState(): void {
    if (typeof window !== 'undefined') {
      try {
        const savedState = localStorage.getItem(GameEngine.STORAGE_KEY);
        if (savedState) {
          this.gameState = JSON.parse(savedState);
        }
      } catch (error) {
        console.error('Failed to load game state:', error);
        this.clearSavedState();
      }
    }
  }

  private clearSavedState(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(GameEngine.STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear saved state:', error);
      }
    }
  }

  resetAndReload(): void {
    try {
      this.gameState = null;

      this.clearSavedState();

      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to reset and reload:', error);
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  }

  async startNewGame(difficulty: DifficultyLevel = 'medium'): Promise<GameState> {
    // Clear any existing saved state when starting new game
    this.clearSavedState();

    try {
      const difficultyConfig = DIFFICULTY_CONFIGS[difficulty];
      const mysteryData = await this.grokClient.generateMystery(difficultyConfig.suspectCount);
      const parsedData = JSON.parse(mysteryData);

      this.gameState = {
        id: Date.now().toString(),
        ...parsedData,
        currentPhase: 'intro',
        conversations: [],
        difficulty: difficulty,
      };

      // Save the new game state
      this.saveGameState();
      return this.gameState!;
    } catch (error) {
      console.error('Failed to start new game:', error);
      throw new Error('Failed to generate mystery. Please try again.');
    }
  }

  startInvestigation(): void {
    if (!this.gameState) {
      throw new Error('No active game. Please start a new game first.');
    }

    this.gameState.currentPhase = 'investigation';
    this.saveGameState();
  }

  async askCharacter(characterId: string, question: string): Promise<void> {
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

    // Save state after each question
    this.saveGameState();
  }

  makeAccusation(characterId: string): boolean {
    if (!this.gameState) {
      return false;
    }

    const accusedCharacter = this.gameState.characters.find(c => c.id === characterId);
    if (!accusedCharacter) {
      return false;
    }

    const isCorrect = accusedCharacter.isKiller;
    if (isCorrect) {
      this.gameState.currentPhase = 'won';
    } else {
      this.gameState.currentPhase = 'lost';
    }

    // Save final state
    this.saveGameState();

    return isCorrect;
  }

  resetGame(): void {
    this.gameState = null;
    this.clearSavedState();
  }

  getGameState(): GameState | null {
    return this.gameState;
  }

  hasSavedGame(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const savedState = localStorage.getItem(GameEngine.STORAGE_KEY);
      return savedState !== null && savedState !== 'null';
    } catch (error) {
      console.error('Failed to check saved game state:', error);
      return false;
    }
  }
}