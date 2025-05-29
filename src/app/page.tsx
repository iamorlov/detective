'use client';

import { useState, useRef } from 'react';
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
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize background music after user interaction
  const enableMusic = () => {
    if (audioRef.current && !musicEnabled) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(console.error);
      setMusicEnabled(true);
    }
  };

  const startNewGame = async () => {
    // Enable music on first user interaction
    enableMusic();
    
    setLoading(true);
    setError(null);
    setGameState(null);
    
    try {
      const newGameState = await gameEngine.startNewGame();
      setGameState(newGameState);
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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-900 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Music - continues playing */}
        <audio ref={audioRef} loop>
          <source src="/music/intro.mp3" type="audio/mpeg" />
        </audio>

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>
        
        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-2xl w-full text-center relative z-10">
          {/* Animated Logo */}
          <div className="relative mb-16">
            <h1 className="text-8xl font-bold text-white mb-6 tracking-wider animate-pulse drop-shadow-2xl">
              NOIRE
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-64 mx-auto mb-4 animate-expand"></div>
            <p className="text-yellow-400 text-xl font-light tracking-[0.5em] uppercase animate-pulse drop-shadow-lg">
              Detective Agency
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-16">
            <div className="relative">
              {/* Spinning outer ring */}
              <div className="w-32 h-32 border-6 border-gray-600 border-t-yellow-400 rounded-full animate-spin mx-auto mb-12 shadow-2xl"></div>
              
              {/* Loading text with typewriter effect */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white mb-8 animate-fade-in tracking-wide drop-shadow-lg">
                  Generating Mystery...
                </h2>
                
                {/* Loading steps with staggered animations */}
                <div className="space-y-4 text-gray-300 text-lg">
                  <div className="flex items-center justify-center space-x-4 animate-slide-in-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                    <span className="font-light tracking-wide">Creating crime scene...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-4 animate-slide-in-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.1s' }}></div>
                    <span className="font-light tracking-wide">Generating suspects...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-4 animate-slide-in-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.2s' }}></div>
                    <span className="font-light tracking-wide">Weaving the mystery...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-3 mb-8 border border-yellow-500/30 shadow-inner">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-3 rounded-full animate-progress shadow-lg"></div>
          </div>

          <p className="text-gray-400 text-xl font-light tracking-wide">
            Please wait while we craft your unique detective story...
          </p>
        </div>

        {/* Music Copyright */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <p className="text-gray-500 text-xs text-center">
            Music by{' '}
            <a 
              href="https://pixabay.com/users/joelfazhari-16466931/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201624"
              className="text-amber-400/60 hover:text-amber-400/80 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Joel Fazhari
            </a>
            {' '}from{' '}
            <a 
              href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201624"
              className="text-amber-400/60 hover:text-amber-400/80 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pixabay
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Show intro/game selection when no game state
  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Music */}
        <audio ref={audioRef} loop>
          <source src="/music/intro.mp3" type="audio/mpeg" />
        </audio>

        {/* Enhanced film grain overlay */}
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none animate-pulse"></div>
        
        {/* Dark vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60 pointer-events-none"></div>
        
        {/* Dim spotlight effect */}
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-amber-600/3 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Additional shadow overlays */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-black/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-black/40 rounded-full blur-2xl"></div>

        <div className="max-w-3xl w-full relative z-10">
          {/* Noir style intro */}
          <div className="text-center mb-20">
            <div className="relative mb-16 animate-fade-in">
              <h1 className="text-9xl font-bold text-gray-100 mb-8 tracking-wider drop-shadow-2xl animate-slide-up text-shadow-lg">
                NOIRE
              </h1>
              <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent w-64 mx-auto mb-6 animate-expand shadow-lg"></div>
              <p className="text-amber-400/80 text-2xl font-light tracking-[0.5em] uppercase animate-slide-up-delayed drop-shadow-xl">
                Detective Agency
              </p>
            </div>
            
            <p className="text-gray-400 text-3xl font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-wide animate-slide-up-delayed-2 drop-shadow-lg">
              Step into the shadows of mystery. Every clue matters. Every question reveals truth. <span className="text-gray-500">The darkness holds secrets...</span>
            </p>
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-12 p-8 bg-red-900/40 border-2 border-red-600/60 rounded-lg backdrop-blur-sm animate-shake shadow-2xl">
              <p className="text-red-200 text-xl font-light tracking-wide">{error}</p>
            </div>
          )}
          
          {/* CTA Button */}
          <div className="text-center animate-slide-up-delayed-3">
            <button
              onClick={startNewGame}
              disabled={loading}
              className="cursor-pointer group relative px-12 py-6 bg-gradient-to-r from-amber-700/80 to-amber-600/80 hover:from-amber-600/90 hover:to-amber-500/90 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-gray-100 font-bold text-xl tracking-widest uppercase transition-all duration-500 transform hover:scale-105 disabled:scale-100 shadow-2xl hover:shadow-amber-600/30 rounded-lg border-2 border-amber-500/40 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <span className="relative z-10 drop-shadow-lg">
                Begin Investigation
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Background Music continues for all game phases */}
      <audio ref={audioRef} loop>
        <source src="/music/intro.mp3" type="audio/mpeg" />
      </audio>

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
