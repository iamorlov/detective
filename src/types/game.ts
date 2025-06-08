export interface Character {
  id: string;
  name: string;
  age: number;
  occupation: string;
  description: string;
  backstory: string;
  alibi: string;
  connections: string[];
  isKiller: boolean;
}

export interface GameState {
  id: string;
  setting: string;
  victim: string;
  murderWeapon: string;
  murderLocation: string;
  murderTime: string;
  backstory: string;
  characters: Character[];
  conversations: Conversation[];
  currentPhase: 'intro' | 'investigation' | 'won' | 'lost';
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Conversation {
  characterId: string;
  messages: Message[];
}

export interface Message {
  speaker: 'player' | 'character';
  content: string;
  timestamp: Date;
  isLie?: boolean;
}

export interface GrokResponse {
  gameState?: GameState;
  characterResponse?: string;
  isLie?: boolean;
  error?: string;
}