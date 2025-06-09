import { GrokClient } from './grok-client';
import { GameState, Message } from '@/types/game';

// Type definitions for difficulty system
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  level: DifficultyLevel;
  suspectCount: number;
  label: string;
}

/**
 * Configuration mapping for different difficulty levels
 * Controls number of suspects to increase complexity
 */
export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: { level: 'easy', suspectCount: 3, label: 'Easy' },
  medium: { level: 'medium', suspectCount: 5, label: 'Medium' },
  hard: { level: 'hard', suspectCount: 7, label: 'Hard' }
};

/**
 * Main game engine class handling all game logic and state management
 * Manages interactions with AI service and local storage persistence
 */
export class GameEngine {
  private gameState: GameState | null = null;
  private grokClient: GrokClient;
  private static readonly STORAGE_KEY = 'detective-game-state';

  constructor() {
    this.grokClient = new GrokClient(process.env.NEXT_PUBLIC_GROK_API_KEY || '');
    this.loadGameState();
  }

  /**
   * Persists current game state to localStorage
   * Enables game continuation between browser sessions
   */
  private saveGameState(): void {
    if (this.gameState && typeof window !== 'undefined') {
      try {
        localStorage.setItem(GameEngine.STORAGE_KEY, JSON.stringify(this.gameState));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    }
  }

  /**
   * Loads saved game state from localStorage on initialization
   * Handles corrupted data gracefully
   */
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

  /**
   * Removes saved game data from localStorage
   * Used when data is corrupted or game is reset
   */
  private clearSavedState(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(GameEngine.STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear saved state:', error);
      }
    }
  }

  /**
   * Nuclear reset option - clears all data and reloads page
   * Used when game gets into unrecoverable state
   */
  resetAndReload(): void {
    try {
      this.gameState = null;
      this.clearSavedState();

      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to reset and reload:', error);
      // Force reload even if cleanup fails
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  }

  /**
   * Initializes a new detective case with specified difficulty
   * Generates all game content via AI service
   */
  async startNewGame(difficulty: DifficultyLevel = 'medium'): Promise<GameState> {
    // Clear any existing saved state when starting fresh
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

      // Immediately save the new game state
      this.saveGameState();
      return this.gameState!;
    } catch (error) {
      console.error('Failed to start new game:', error);
      throw new Error('Failed to generate mystery. Please try again.');
    }
  }

  /**
   * Transitions game from intro phase to investigation phase
   * Updates game state and persists change
   */
  startInvestigation(): void {
    if (!this.gameState) {
      throw new Error('No active game. Please start a new game first.');
    }

    this.gameState.currentPhase = 'investigation';
    this.saveGameState();
  }

  /**
   * Handles player questions to characters
   * Manages conversation history and AI response generation
   */
  async askCharacter(characterId: string, question: string): Promise<void> {
    if (!this.gameState) {
      throw new Error('No active game');
    }

    const character = this.gameState.characters.find(c => c.id === characterId);
    if (!character) {
      throw new Error('Character not found');
    }

    // Find or create conversation thread for this character
    let conversation = this.gameState.conversations.find(c => c.characterId === characterId);
    if (!conversation) {
      conversation = { characterId, messages: [] };
      this.gameState.conversations.push(conversation);
    }

    // Record player's question
    const playerMessage: Message = {
      speaker: 'player',
      content: question,
      timestamp: new Date(),
    };
    conversation.messages.push(playerMessage);

    // Prepare conversation context for AI
    const conversationHistory = conversation.messages.map(m =>
      `${m.speaker}: ${m.content}`
    );

    // Get AI-generated character response
    const { response, isLie } = await this.grokClient.getCharacterResponse(
      character,
      question,
      conversationHistory
    );

    // Record character's response
    const characterMessage: Message = {
      speaker: 'character',
      content: response,
      timestamp: new Date(),
      isLie,
    };
    conversation.messages.push(characterMessage);

    // Persist updated conversation state
    this.saveGameState();
  }

  /**
   * Handles player accusation and determines win/loss
   * Transitions game to final state based on accuracy
   */
  makeAccusation(characterId: string): boolean {
    if (!this.gameState) {
      return false;
    }

    const accusedCharacter = this.gameState.characters.find(c => c.id === characterId);
    if (!accusedCharacter) {
      return false;
    }

    // Check if player accused the correct killer
    const isCorrect = accusedCharacter.isKiller;
    if (isCorrect) {
      this.gameState.currentPhase = 'won';
    } else {
      this.gameState.currentPhase = 'lost';
    }

    // Save final game state
    this.saveGameState();

    return isCorrect;
  }

  /**
   * Resets game state without page reload
   * Used for returning to main menu
   */
  resetGame(): void {
    this.gameState = null;
    this.clearSavedState();
  }

  /**
   * Returns current game state
   * Used by UI components to render game content
   */
  getGameState(): GameState | null {
    return this.gameState;
  }

  /**
   * Checks if there's a saved game available
   * Used to show "Continue Game" option on main menu
   */
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