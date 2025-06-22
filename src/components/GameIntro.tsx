'use client';

import Image from 'next/image';
import { GameState } from '@/types/game';
import { AvatarService } from '@/lib/avatar-service';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/useAuth';

interface GameIntroProps {
  gameState: GameState;
  onStartInvestigation: () => void;
}

export default function GameIntro({ gameState, onStartInvestigation }: GameIntroProps) {
  const avatarService = new AvatarService();
  const t = useTranslations();
  const { user } = useAuth();

  const getDifficultyDisplay = () => {
    if (!gameState.difficulty) return '';

    const difficultyLabels = {
      easy: t.easy || 'Easy',
      medium: t.medium || 'Medium',
      hard: t.hard || 'Hard',
    };

    return difficultyLabels[gameState.difficulty];
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden">
      {/* Material 3 surface tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>

      {/* Material 3 Top App Bar */}
      <div className="bg-slate-800/90 border-b border-slate-600/20 p-4 sm:p-6 backdrop-blur-md relative z-10 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
              <div>
                <h1 className="text-xl sm:text-2xl font-medium text-slate-100 tracking-wide playfair-font">
                  {t.caseFile}
                </h1>
                <div className="h-0.5 bg-blue-400/70 w-12 sm:w-16 mt-1"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-blue-300/80 text-xs sm:text-sm font-medium tracking-wider">
                  {gameState.setting}
                </div>
                {gameState.difficulty && (
                  <div className="px-3 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-medium uppercase tracking-wider">
                    {getDifficultyDisplay()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Case details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-100 mb-4 sm:mb-6 tracking-wide playfair-font">
                {user?.displayName ? `${t.theInvestigationBegins}, ${user.displayName}` : t.theInvestigationBegins}
              </h2>
              <div className="h-0.5 bg-gradient-to-r from-blue-400/60 to-transparent mb-4 sm:mb-6 lg:mb-8"></div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Victim */}
              <div className="p-4 sm:p-6 bg-slate-800/60 border border-slate-600/30 rounded-3xl backdrop-blur-sm shadow-lg elevation-1">
                <h3 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">
                  {t.victim}
                </h3>
                <p className="text-slate-100 font-normal text-sm sm:text-base">{gameState.victim}</p>
              </div>

              {/* Weapon & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-slate-800/40 border border-slate-600/20 rounded-2xl backdrop-blur-sm shadow-md">
                  <h4 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">
                    {t.weapon}
                  </h4>
                  <p className="text-slate-100 font-normal text-sm sm:text-base">{gameState.murderWeapon}</p>
                </div>
                <div className="p-3 sm:p-4 bg-slate-800/40 border border-slate-600/20 rounded-2xl backdrop-blur-sm shadow-md">
                  <h4 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">
                    {t.location}
                  </h4>
                  <p className="text-slate-100 font-normal text-sm sm:text-base">{gameState.murderLocation}</p>
                </div>
              </div>

              {/* Time of Death */}
              <div className="p-3 sm:p-4 bg-slate-800/40 border border-slate-600/20 rounded-2xl backdrop-blur-sm shadow-md">
                <h4 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">
                  {t.timeOfDeath}
                </h4>
                <p className="text-slate-100 font-normal text-sm sm:text-base">{gameState.murderTime}</p>
              </div>

              {/* Evidence/Belongings */}
              {gameState.belongings && (
                <div className="p-3 sm:p-4 bg-slate-800/40 border border-slate-600/20 rounded-2xl backdrop-blur-sm shadow-md">
                  <h4 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">
                    {t.belongings}
                  </h4>
                  <p className="text-slate-100 font-normal text-sm sm:text-base">{gameState.belongings}</p>
                </div>
              )}

              {/* Case Background */}
              <div className="p-4 sm:p-6 bg-slate-800/60 border border-slate-600/30 rounded-3xl backdrop-blur-sm shadow-lg elevation-1">
                <h3 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4">
                  {t.caseBackground}
                </h3>
                <p className="text-slate-100 font-normal text-sm sm:text-base leading-relaxed">{gameState.backstory}</p>
              </div>
            </div>
          </div>

          {/* Suspects and action */}
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center justify-end">
            <div className="p-4 sm:p-6 bg-slate-800/60 border border-slate-600/30 rounded-3xl backdrop-blur-sm shadow-lg elevation-2">
              <h3 className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4">
                {t.suspects}
              </h3>

              {/* Character Avatars Grid - responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {gameState.characters.map((character) => (
                  <div key={character.id} className="text-center">
                    <div className="relative">
                      <Image
                        src={avatarService.generateAvatarUrl(character, 64)}
                        alt={character.name}
                        width={64}
                        height={64}
                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl mx-auto mb-1 sm:mb-2 shadow-md"
                        unoptimized={true}
                      />
                    </div>
                    <p className="text-slate-400 text-xs font-normal truncate px-1">{character.name}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-400 font-normal mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
                {gameState.characters.length} {t.suspectsDescription}
              </p>

              <button
                onClick={onStartInvestigation}
                className="cursor-pointer group w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium tracking-wide uppercase transition-all duration-200 rounded-full shadow-lg hover:shadow-xl text-sm sm:text-base elevation-2"
              >
                <span className="playfair-font">{t.startInterrogation}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}