'use client';

import { useState, useEffect } from 'react';
import { GameEngine } from '@/lib/game-engine';
import { GameState } from '@/types/game';
import GameIntro from '@/components/GameIntro';
import Investigation from '@/components/Investigation';
import GameResult from '@/components/GameResult';

export default function Home() {
  const [gameEngine] = useState(() => new GameEngine(process.env.NEXT_PUBLIC_GROK_API_KEY || ''));
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvestigating, setIsInvestigating] = useState(false);

  const startNewGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const newGameState = await gameEngine.startNewGame();
      setGameState(newGameState);
      console.log('Game state set:', newGameState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error starting game:', err);
    } finally {
      setLoading(false);
    }
  };

  const startInvestigation = () => {
    setIsInvestigating(true);
    gameEngine.startInvestigation();
    setError(null);
    setGameState(gameEngine.getGameState());
  };

  const askCharacter = async (characterId: string, question: string) => {
    try {
      await gameEngine.askCharacter(characterId, question);
      setGameState(gameEngine.getGameState());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response');
    }
  };

  const makeAccusation = (characterId: string) => {
    setIsInvestigating(false);
    const result = gameEngine.makeAccusation(characterId);
    setGameState(gameEngine.getGameState());
    if (!result.success) {
      setError(result.message);
    }
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Noir style intro */}
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <h1 className="text-6xl font-light text-white mb-4 tracking-wider">
                NOIR
              </h1>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-32 mx-auto mb-2"></div>
              <p className="text-amber-400 text-sm font-light tracking-[0.3em] uppercase">
                Detective Agency
              </p>
            </div>
            
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-12 max-w-md mx-auto">
              Step into the shadows of mystery. Every clue matters. Every question reveals truth.
            </p>
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
              <p className="text-red-300 text-sm font-light">{error}</p>
            </div>
          )}
          
          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={startNewGame}
              disabled={loading}
              className="group relative px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-gray-600 disabled:to-gray-500 text-black font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                {loading ? 'Investigating...' : 'Begin Investigation'}
              </span>
              {loading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {gameState.currentPhase === 'intro' && (
        <GameIntro gameState={gameState} onStartInvestigation={startInvestigation} />
      )}
      
      {isInvestigating && (
        <Investigation 
          gameState={gameState} 
          onAskCharacter={askCharacter}
          onMakeAccusation={makeAccusation}
        />
      )}
      
      {(gameState.currentPhase === 'won' || gameState.currentPhase === 'lost') && (
        <GameResult 
          gameState={gameState} 
          onNewGame={startNewGame}
        />
      )}
    </div>
  );
}
