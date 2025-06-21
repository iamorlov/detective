'use client';

import Image from 'next/image';
import { GameEngine } from '@/lib/game-engine';
import { GameState } from '@/types/game';
import { AvatarService } from '@/lib/avatar-service';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

interface GameResultProps {
  gameState: GameState;
  onNewGame: () => void;
}

export default function GameResult({ gameState, onNewGame }: GameResultProps) {
  const [gameEngine] = useState(() => new GameEngine());
  const killer = gameState.characters.find(c => c.isKiller);
  const isWon = gameState.currentPhase === 'won';
  const avatarService = new AvatarService();
  const t = useTranslations();
  const { user } = useAuth();

  const handleResetAndReload = () => {
    gameEngine.resetAndReload();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Material 3 surface tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>

      <div className="max-w-md sm:max-w-lg lg:max-w-2xl w-full relative z-10">
        {/* Header Section with Animation */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 opacity-80">
            {isWon ? '⚖️' : '💀'}
          </div>

          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 tracking-wide animate-slide-up drop-shadow-2xl playfair-font uppercase ${isWon ? 'text-green-400/90' : 'text-red-400/90'
            }`}>
            {isWon ? t.caseClosed : t.justiceDenied}
          </h1>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-slate-500/50 to-transparent w-32 sm:w-40 lg:w-48 mx-auto animate-expand"></div>
        </div>

        {/* Single Column Layout */}
        <div className="space-y-4 sm:space-y-6">
          {/* Killer Reveal Card */}
          <div className="bg-slate-800/60 border border-slate-600/30 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg elevation-2 animate-slide-up-delayed">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-medium text-slate-100 mb-3 sm:mb-4 tracking-wide playfair-font">{t.theTruthRevealed}</h2>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent w-16 sm:w-20 lg:w-24 mx-auto mb-4 sm:mb-6"></div>
            </div>

            {killer && (
              <div className="space-y-4 sm:space-y-6">
                {/* Killer Avatar and Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 p-4 sm:p-6 bg-slate-750/50 rounded-2xl border border-slate-600/20 shadow-md">
                  <Image
                    src={avatarService.generateAvatarUrl(killer, 80)}
                    alt={killer.name}
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl shadow-lg flex-shrink-0"
                    unoptimized={true}
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-medium text-slate-100 mb-1 sm:mb-2">{killer.name}</h3>
                    <p className="text-blue-300/80 text-sm mb-1">{killer.occupation}</p>
                    <p className="text-slate-400 text-sm">{killer.age} {t.yearsOld}</p>
                  </div>
                </div>

                {/* Killer Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-red-900/20 border border-red-500/30 rounded-2xl backdrop-blur-sm shadow-md">
                    <h4 className="text-red-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">{t.motive}</h4>
                    <p className="text-slate-100 font-normal leading-relaxed text-sm sm:text-base">{killer.backstory}</p>
                  </div>

                  <div className="p-3 sm:p-4 bg-blue-900/20 border border-blue-500/30 rounded-2xl backdrop-blur-sm shadow-md">
                    <h4 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">{t.falseAlibi}</h4>
                    <p className="text-slate-100 font-normal leading-relaxed text-sm sm:text-base">{killer.alibi}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result Message */}
          <div className={`p-4 sm:p-6 lg:p-8 rounded-3xl border backdrop-blur-sm shadow-lg transition-all duration-500 animate-slide-up-delayed-2 elevation-1 ${isWon
              ? 'bg-green-900/20 border-green-500/30'
              : 'bg-red-900/20 border-red-500/30'
            }`}>
            <div className="text-center">
              <h3 className={`text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 ${isWon ? 'text-green-300' : 'text-red-300'}`}>
                {isWon ? t.justiceServed : t.theKillerWalksFree}
              </h3>
              <p className="text-slate-100 font-normal leading-relaxed text-sm sm:text-base">
                {isWon ? t.justiceServedMessage : t.killerWalksFreeMessage}{user?.displayName ? `, ${user.displayName}.` : '.'}
              </p>
            </div>
          </div>

          {/* Investigation Stats */}
          <div className="bg-slate-800/40 border border-slate-600/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md animate-slide-up-delayed-3">
            <h3 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 text-center">{t.investigationSummary}</h3>

            <div className="text-center p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-medium text-slate-100 mb-1">
                {gameState.conversations.reduce((total, conv) => total + conv.messages.length, 0)}
              </div>
              <div className="text-slate-400 text-xs sm:text-sm">{t.questionsAsked}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-6 sm:mt-8 mb-6 sm:mb-8 animate-slide-up-delayed-4 flex flex-col items-center space-y-3 sm:space-y-4">
          <button
            onClick={onNewGame}
            className="cursor-pointer w-full max-w-sm px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium tracking-wide uppercase transition-all duration-200 rounded-full shadow-lg hover:shadow-xl text-sm sm:text-base elevation-2"
          >
            <span className="playfair-font">{t.startNewInvestigation}</span>
          </button>

          <button
            onClick={handleResetAndReload}
            className="cursor-pointer w-full max-w-sm px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium tracking-wide uppercase transition-all duration-200 rounded-full shadow-lg hover:shadow-xl border border-slate-600/30 text-sm sm:text-base"
          >
            <span className="playfair-font">{t.toMainPage}</span>
          </button>
        </div>
      </div>
    </div>
  );
}