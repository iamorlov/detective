'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameEngine, DifficultyLevel } from '@/lib/game-engine';
import { GameState } from '@/types/game';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import GameIntro from '@/components/GameIntro';
import Investigation from '@/components/Investigation';
import GameResult from '@/components/GameResult';
import InfoModal from '@/components/InfoModal';
import LanguageSelector from '@/components/LanguageSelector';
import DifficultySelector from '@/components/DifficultySelector';
import SignOutButton from '@/components/SignOutButton';

export default function Home() {
  const { isAuthenticated, signInWithGoogle, isLoading } = useAuth();
  const t = useTranslations();

  const [gameEngine] = useState(() => new GameEngine());
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');
  const audioRef = useRef<HTMLAudioElement>(null);
  const version = '1.0.0-beta';

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

  // Simplified neon glow animation variants
  const neonGlowVariants = {
    animate: {
      textShadow: [
        "0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.8), 0 0 24px rgba(59, 130, 246, 0.8), 0 0 32px rgba(59, 130, 246, 0.4)",
        "0 0 12px rgba(59, 130, 246, 1), 0 0 24px rgba(59, 130, 246, 1), 0 0 36px rgba(59, 130, 246, 1), 0 0 48px rgba(59, 130, 246, 0.6)",
        "0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.8), 0 0 24px rgba(59, 130, 246, 0.8), 0 0 32px rgba(59, 130, 246, 0.4)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Initialize background music after user interaction
  const enableMusic = () => {
    if (audioRef.current && !musicEnabled) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(console.error);
      setMusicEnabled(true);
    }
  };

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setSigningIn(false);
    }
  };

  useEffect(() => {
    // Check for saved game on component mount
    const checkSavedGame = () => {
      const savedGameExists = gameEngine.hasSavedGame();
      setHasSavedGame(savedGameExists);

      if (savedGameExists) {
        const savedState = gameEngine.getGameState();
        if (savedState) {
          setGameState(savedState);
          if (savedState.currentPhase === 'investigation') {
            setIsInvestigating(true);
          }
        }
      }
    };

    checkSavedGame();
  }, [gameEngine]);

  const startNewGame = async (difficulty?: DifficultyLevel) => {
    // Enable music on first user interaction
    enableMusic();

    setLoading(true);
    setError(null);
    setGameState(null);
    setIsInvestigating(false);

    try {
      const difficultyToUse = difficulty || selectedDifficulty;
      const newGameState = await gameEngine.startNewGame(difficultyToUse);
      setGameState(newGameState);
      setHasSavedGame(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error starting game:', err);
    } finally {
      setLoading(false);
    }
  };

  const continueGame = () => {
    enableMusic();
    const savedState = gameEngine.getGameState();
    if (savedState) {
      setGameState(savedState);
      if (savedState.currentPhase === 'investigation') {
        setIsInvestigating(true);
      }
    }
  };

  const resetGame = () => {
    gameEngine.resetGame();
    setGameState(null);
    setIsInvestigating(false);
    setHasSavedGame(false);
    setError(null);
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
    if (!result) {
      setError('Failed to make accusation');
    }
  };

  const resetGameState = () => {
    setGameState(null);
    setIsInvestigating(false);
  };

  // Show loading spinner while auth is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading screen when generating new game
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        <audio ref={audioRef} loop>
          <source src="/music/intro.mp3" type="audio/mpeg" />
        </audio>

        {/* Material 3 surface tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>

        {/* Subtle spotlight effect */}
        <div className="absolute top-0 left-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-md sm:max-w-2xl w-full text-center relative z-10 px-4">
          {/* Animated Logo */}
          <div className="relative mb-8 sm:mb-12">
            <motion.h1
              className="text-[5rem] sm:text-[8rem] lg:text-[10rem] font-medium text-slate-100 mb-4 sm:mb-6 tracking-wide drop-shadow-lg playfair-font"
              variants={neonGlowVariants}
              animate="animate"
            >
              {t.title}
            </motion.h1>
            <div className="h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent w-48 sm:w-64 lg:w-72 mx-auto mb-4 sm:mb-6 animate-expand"></div>
            <p className="text-blue-300/80 text-sm sm:text-lg lg:text-xl font-normal tracking-wider uppercase">
              {t.detectiveAgency}
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-6 sm:mb-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <h3 className="text-lg sm:text-xl font-medium text-slate-100 tracking-wide">
                  {t.generatingNewCase}
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base font-normal px-2 transition-opacity duration-500" key={loadingStepIndex}>
                {loadingSteps[loadingStepIndex]}
              </p>
            </div>
          </div>

          {/* Material 3 Progress Indicator */}
          <div className="w-full bg-slate-700/50 rounded-full h-2 mb-6 sm:mb-8 overflow-hidden">
            <div
              className="bg-blue-400 h-2 rounded-full transition-all duration-800 shadow-sm"
              style={{
                width: `${((loadingStepIndex + 1) / loadingSteps.length) * 100}%`
              }}
            ></div>
          </div>

          <p className="text-slate-400 text-sm font-normal tracking-wide opacity-70">
            {t.pleasewait}
          </p>
        </div>

        {/* Music Copyright */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <p className="text-slate-500 text-xs text-center px-2">
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        <audio ref={audioRef} loop>
          <source src="/music/intro.mp3" type="audio/mpeg" />
        </audio>

        {/* Info Modal */}
        <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />

        {/* Material 3 Top App Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowInfoModal(true)}
                  className="cursor-pointer p-3 hover:bg-slate-700/50 text-blue-300 hover:text-blue-200 transition-colors duration-200 rounded-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <span className="hidden sm:inline text-sm text-blue-300/70">{t.infoButton}</span>
              </div>

              <div className="flex items-center gap-3">
                <LanguageSelector />
                {isAuthenticated && <SignOutButton onSignOut={resetGameState} />}
              </div>
            </div>
          </div>
        </div>

        {/* Material 3 surface tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>

        {/* Subtle spotlight effect */}
        <div className="absolute top-0 left-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-400/3 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-md sm:max-w-2xl lg:max-w-3xl w-full relative z-10">
          {/* Material 3 Hero Section */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="relative mb-8 sm:mb-16">
              <motion.h1
                className="text-[5rem] sm:text-[8rem] lg:text-[10rem] font-medium text-slate-100 mb-6 sm:mb-8 tracking-wide drop-shadow-lg playfair-font"
                variants={neonGlowVariants}
                animate="animate"
              >
                {t.title}
              </motion.h1>
              <div className="h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent w-48 sm:w-64 lg:w-72 mx-auto mb-4 sm:mb-6 animate-expand"></div>
              <p className="text-blue-300/80 text-sm sm:text-xl lg:text-2xl font-normal tracking-wider uppercase">
                {t.detectiveAgency}
              </p>
            </div>

            <p className="text-slate-400 text-lg sm:text-xl font-normal leading-relaxed mb-8 sm:mb-16 max-w-xl sm:max-w-2xl mx-auto tracking-wide px-4">
              {t.tagline}
            </p>
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-8 sm:mb-12 mx-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm shadow-lg">
                <p className="text-red-200 text-sm sm:text-base font-normal">{error}</p>
              </div>
            </div>
          )}

          {/* Material 3 Action Cards */}
          <div className="px-4 flex flex-col items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Continue Game Button */}
                {hasSavedGame && (
                  <div className="w-full max-w-sm">
                    <button
                      onClick={continueGame}
                      disabled={loading}
                      className="cursor-pointer w-full py-4 px-6 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium text-base transition-all duration-200 rounded-full shadow-lg hover:shadow-xl"
                    >
                      <span className="playfair-font">{t.continueGame}</span>
                    </button>
                  </div>
                )}

                {/* Difficulty Selector */}
                <div className="w-full max-w-sm">
                  <DifficultySelector
                    selectedDifficulty={selectedDifficulty}
                    onDifficultyChange={setSelectedDifficulty}
                  />
                </div>

                {/* Start New Game Button */}
                <div className="w-full max-w-sm">
                  <button
                    onClick={() => startNewGame()}
                    disabled={loading}
                    className="cursor-pointer w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium text-base transition-all duration-200 rounded-full shadow-lg hover:shadow-xl"
                  >
                    <span className="playfair-font">{t.beginInvestigation}</span>
                  </button>
                </div>

                {/* Version info at bottom center */}
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <p className="text-slate-500 text-xs text-center">
                    v{version}
                  </p>
                </div>
              </>
            ) : (
              <div className="w-full max-w-sm">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={signingIn}
                  className="cursor-pointer w-full py-4 px-6 bg-white hover:bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 font-medium text-base transition-all duration-200 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {signingIn ? (
                    <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  <span>{signingIn ? t.singingIn : t.continueWithGoogle}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Background Music continues for all game phases */}
      <audio ref={audioRef} loop>
        <source src="/music/intro.mp3" type="audio/mpeg" />
      </audio>

      {gameState.currentPhase === 'intro' && (
        <GameIntro gameState={gameState} onStartInvestigation={startInvestigation} />
      )}

      {isInvestigating && gameState && (
        <Investigation
          gameState={gameState}
          onAskCharacter={askCharacter}
          onMakeAccusation={makeAccusation}
          onResetGame={resetGame}
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
