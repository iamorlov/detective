/**
 * Represents a character in the detective game
 * Each character can be either a suspect or the killer
 */
export interface Character {
  id: string;
  name: string;
  age: number;
  occupation: string;
  description: string;
  backstory: string;
  alibi: string;
  connections: string[]; // Other character names this character knows
  isKiller: boolean; // Only one character should have this as true
}

/**
 * Main game state interface containing all game data
 * Persisted to localStorage for game continuation
 */
export interface GameState {
  id: string;
  setting: string; // Time and place context (e.g., "Hotel in New York, 1960s")
  victim: string;
  murderWeapon: string;
  belongings?: string; // Optional belongings of the victim
  murderLocation: string;
  murderTime: string;
  backstory: string; // Case background story
  characters: Character[];
  conversations: Conversation[];
  currentPhase: 'intro' | 'investigation' | 'won' | 'lost';
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * Conversation history between player and a specific character
 */
export interface Conversation {
  characterId: string;
  messages: Message[];
}

/**
 * Individual message in a conversation
 * Tracks speaker, content, timestamp and potential lies
 */
export interface Message {
  speaker: 'player' | 'character';
  content: string;
  timestamp: Date;
  isLie?: boolean; // Used to track when killer is lying
}

/**
 * Response structure from Grok API
 * Used for both mystery generation and character responses
 */
export interface GrokResponse {
  gameState?: GameState;
  characterResponse?: string;
  isLie?: boolean;
  error?: string;
}