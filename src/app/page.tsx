'use client';

import { useState } from 'react';
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
    setGameState(null); // Clear any existing game state
    
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

  // Show loading screen when generating new game
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          {/* Animated Logo */}
          <div className="relative mb-8">
            <h1 className="text-6xl font-light text-white mb-4 tracking-wider animate-pulse">
              NOIR
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-32 mx-auto mb-2 animate-pulse"></div>
            <p className="text-amber-400 text-sm font-light tracking-[0.3em] uppercase animate-pulse">
              Detective Agency
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-8">
            <div className="relative">
              {/* Spinning outer ring */}
              <div className="w-20 h-20 border-4 border-gray-600 border-t-amber-400 rounded-full animate-spin mx-auto mb-6"></div>
              
              {/* Loading text with typewriter effect */}
              <div className="space-y-3">
                <h2 className="text-2xl font-light text-white mb-4 animate-fade-in">
                  Generating Mystery...
                </h2>
                
                {/* Loading steps with staggered animations */}
                <div className="space-y-2 text-gray-400 text-sm">
                  <div className="flex items-center justify-center space-x-2 animate-slide-in-1">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                    <span>Creating crime scene...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 animate-slide-in-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <span>Generating suspects...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 animate-slide-in-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span>Weaving the mystery...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-2 rounded-full animate-progress"></div>
          </div>

          <p className="text-gray-400 text-sm font-light">
            Please wait while we craft your unique detective story...
          </p>
        </div>
      </div>
    );
  }

  // Show intro/game selection when no game state
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
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg backdrop-blur-sm animate-shake">
              <p className="text-red-300 text-sm font-light">{error}</p>
            </div>
          )}
          
          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={startNewGame}
              disabled={loading}
              className="cursor-pointer group relative px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed text-black font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-2xl rounded-lg"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Begin Investigation</span>
                <span className="text-lg">🔍</span>
              </span>
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
