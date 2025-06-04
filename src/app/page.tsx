'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameEngine } from '@/lib/game-engine';
import { GameState } from '@/types/game';
import GameIntro from '@/components/GameIntro';
import Investigation from '@/components/Investigation';
import GameResult from '@/components/GameResult';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslations } from '@/hooks/useTranslations';

export default function Home() {
  const [gameEngine] = useState(() => new GameEngine(process.env.NEXT_PUBLIC_GROK_API_KEY || ''));
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = useTranslations();

  // Simplified neon glow animation variants
  const neonGlowVariants = {
    animate: {
      textShadow: [
        "0 0 5px rgba(59, 130, 246, 0.8), 0 0 10px rgba(59, 130, 246, 0.8), 0 0 15px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)",
        "0 0 10px rgba(59, 130, 246, 1), 0 0 20px rgba(59, 130, 246, 1), 0 0 30px rgba(59, 130, 246, 1), 0 0 40px rgba(59, 130, 246, 0.6)",
        "0 0 5px rgba(59, 130, 246, 0.8), 0 0 10px rgba(59, 130, 246, 0.8), 0 0 15px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Loading steps array - now using translations
  const loadingSteps = [
    t.loadingSteps.creatingScene,
    t.loadingSteps.generatingSuspects,
    t.loadingSteps.weavingMystery,
    t.loadingSteps.settingAlibis,
    t.loadingSteps.plantingEvidence,
    t.loadingSteps.craftingTwist,
    t.loadingSteps.buildingNarrative,
    t.loadingSteps.preparingInvestigation,
    t.loadingSteps.assemblingClues,
    t.loadingSteps.finalizingDetails
  ];

  // Initialize background music after user interaction
  const enableMusic = () => {
    if (audioRef.current && !musicEnabled) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(console.error);
      setMusicEnabled(true);
    }
  };

  // Loading step animation effect
  useEffect(() => {
    if (loading) {
      setLoadingStepIndex(0);
      const interval = setInterval(() => {
        setLoadingStepIndex(prev => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [loading, loadingSteps.length]);

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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-900 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        <audio ref={audioRef} loop>
          <source src="/music/intro.mp3" type="audio/mpeg" />
        </audio>

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>

        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600/3 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-xs sm:max-w-2xl w-full text-center relative z-10 px-4">
          {/* Animated Logo */}
          <div className="relative mb-8 sm:mb-16 animate-fade-in">
            <motion.h1
              className="text-5xl sm:text-7xl lg:text-9xl font-bold text-gray-100 mb-4 sm:mb-8 tracking-wider drop-shadow-2xl playfair-font"
              variants={neonGlowVariants}
              animate="animate"
            >
              {t.title}
            </motion.h1>
            <div className="h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent w-32 sm:w-48 lg:w-64 mx-auto mb-3 mt-3 sm:mb-6 animate-expand shadow-lg"></div>
            <p className="text-blue-400/80 text-sm sm:text-xl lg:text-2xl font-light tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.5em] uppercase animate-slide-up-delayed drop-shadow-xl">
              {t.detectiveAgency}
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-4 sm:mb-8">
            <div className="relative">

              {/* Loading text with typewriter effect */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-8 animate-fade-in tracking-wide drop-shadow-lg playfair-font">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    {t.generatingNewCase}
                  </div>
                </h2>

                {/* Single loading step with animation */}
                <div className="text-gray-300 text-sm sm:text-lg min-h-[60px] sm:min-h-[80px] flex items-center justify-center">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <span
                      key={loadingStepIndex}
                      className="text-gray-400 text-sm sm:text-sm font-light tracking-wide px-2 animate-fade-in-scale"
                    >
                      {loadingSteps[loadingStepIndex]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3 mb-6 sm:mb-8 border border-blue-500/30 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 sm:h-3 rounded-full transition-all duration-800 shadow-lg"
              style={{
                width: `${((loadingStepIndex + 1) / loadingSteps.length) * 100}%`
              }}
            ></div>
          </div>

          <p className="text-gray-400 text-sm sm:text-sm font-light tracking-wide px-2 opacity-50">
            {t.pleasewait}
          </p>
        </div>

        {/* Music Copyright */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <p className="text-gray-500 text-xs text-center px-2">
            {t.musicBy}{' '}
            <a
              href="https://pixabay.com/users/joelfazhari-16466931/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201624"
              className="text-blue-400/60 hover:text-blue-400/80 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Joel Fazhari
            </a>
            {' '}{t.from}{' '}
            <a
              href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=201624"
              className="text-blue-400/60 hover:text-blue-400/80 transition-colors duration-200"
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
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        <audio ref={audioRef} loop>
          <source src="/music/intro.mp3" type="audio/mpeg" />
        </audio>
        {/* Language Selector - Fixed position */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 max-w-xs sm:max-w-2xl lg:max-w-3xl w-full px-4 sm:px-8">
          <div className="flex justify-end">
            <LanguageSelector />
          </div>
        </div>

        {/* Enhanced film grain overlay */}
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none animate-pulse"></div>

        {/* Dark vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60 pointer-events-none"></div>

        {/* Dim spotlight effect */}
        <div className="absolute top-0 left-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Additional shadow overlays */}
        <div className="absolute top-1/4 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-black/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-black/40 rounded-full blur-2xl"></div>

        <div className="max-w-xs sm:max-w-2xl lg:max-w-3xl w-full relative z-10">
          {/* Noir style intro */}
          <div className="text-center mb-10 sm:mb-20">
            <div className="relative mb-8 sm:mb-16 animate-fade-in">
              <motion.h1
                className="text-5xl sm:text-7xl lg:text-9xl font-bold text-gray-100 mb-4 sm:mb-8 tracking-wider drop-shadow-2xl playfair-font"
                variants={neonGlowVariants}
                animate="animate"
              >
                {t.title}
              </motion.h1>
              <div className="h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent w-32 sm:w-48 lg:w-64 mx-auto mb-3 mt-3 sm:mb-6 animate-expand shadow-lg"></div>
              <p className="text-blue-400/80 text-sm sm:text-xl lg:text-2xl font-light tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.5em] uppercase animate-slide-up-delayed drop-shadow-xl">
                {t.detectiveAgency}
              </p>
            </div>

            <p className="text-gray-400 text-lg sm:text-xl lg:text-xl font-light leading-relaxed mb-8 sm:mb-16 max-w-xl sm:max-w-2xl mx-auto tracking-wide animate-slide-up-delayed-2 drop-shadow-lg px-4">
              {t.tagline}
            </p>
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-6 sm:mb-12 p-4 sm:p-8 bg-red-900/40 border-2 border-red-600/60 rounded-lg backdrop-blur-sm animate-shake shadow-2xl mx-4">
              <p className="text-red-200 text-sm sm:text-xl font-light tracking-wide">{error}</p>
            </div>
          )}

          {/* CTA Button */}
          <div className="text-center animate-slide-up-delayed-3 px-4">
            <button
              onClick={startNewGame}
              disabled={loading}
              className="cursor-pointer group relative px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-700/80 to-blue-600/80 hover:from-blue-600/90 hover:to-blue-500/90 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-gray-100 font-bold text-sm sm:text-xl tracking-widest uppercase transition-all duration-500 transform hover:scale-105 disabled:scale-100 shadow-2xl hover:shadow-blue-600/30 rounded-lg border-2 border-blue-500/40 backdrop-blur-sm w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <span className="relative z-10 drop-shadow-lg playfair-font">
                {t.beginInvestigation}
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
