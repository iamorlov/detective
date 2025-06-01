'use client';

import Image from 'next/image';
import { GameState } from '@/types/game';
import { AvatarService } from '@/lib/avatar-service';
import { useTranslations } from '@/hooks/useTranslations';

interface GameIntroProps {
  gameState: GameState;
  onStartInvestigation: () => void;
}

export default function GameIntro({ gameState, onStartInvestigation }: GameIntroProps) {
  const avatarService = new AvatarService();
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 flex flex-col relative overflow-hidden">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>
      
      {/* Dark vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-70 pointer-events-none"></div>
      
      {/* Atmospheric shadows - responsive sizes */}
      <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-black/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-black/60 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-800/70 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-light text-gray-200 tracking-wide drop-shadow-lg playfair-font">{t.caseFile}</h1>
              <div className="h-px bg-amber-500/70 w-12 sm:w-16 mt-1 shadow-lg"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-amber-500/80 text-xs sm:text-sm font-light tracking-wider">
                {gameState.setting}
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
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-100 mb-4 sm:mb-6 tracking-wide drop-shadow-xl playfair-font">
                {t.theInvestigationBegins}
              </h2>
              <div className="h-px bg-gradient-to-r from-amber-500/60 to-transparent mb-4 sm:mb-6 lg:mb-8 shadow-lg"></div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Victim */}
              <div className="p-4 sm:p-6 bg-black/40 border border-gray-700/50 rounded-xl backdrop-blur-sm shadow-2xl">
                <h3 className="text-amber-500/90 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">{t.victim}</h3>
                <p className="text-gray-300 font-light text-sm sm:text-base">{gameState.victim}</p>
              </div>

              {/* Weapon & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-black/30 border border-gray-700/40 rounded-lg shadow-xl">
                  <h4 className="text-amber-500/90 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">{t.weapon}</h4>
                  <p className="text-gray-300 font-light text-sm sm:text-base">{gameState.murderWeapon}</p>
                </div>
                <div className="p-3 sm:p-4 bg-black/30 border border-gray-700/40 rounded-lg shadow-xl">
                  <h4 className="text-amber-500/90 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">{t.location}</h4>
                  <p className="text-gray-300 font-light text-sm sm:text-base">{gameState.murderLocation}</p>
                </div>
              </div>

              {/* Time of Death */}
              <div className="p-3 sm:p-4 bg-black/30 border border-gray-700/40 rounded-lg shadow-xl">
                <h4 className="text-amber-500/90 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3">{t.timeOfDeath}</h4>
                <p className="text-gray-300 font-light text-sm sm:text-base">{gameState.murderTime}</p>
              </div>

              {/* Case Background */}
              <div className="p-4 sm:p-6 bg-black/40 border border-gray-700/50 rounded-xl backdrop-blur-sm shadow-2xl">
                <h3 className="text-amber-500/90 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4">{t.caseBackground}</h3>
                <p className="text-gray-300 font-light text-sm sm:text-base">{gameState.backstory}</p>
              </div>
            </div>
          </div>

          {/* Suspects and action */}
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center justify-end">
            <div className="p-4 sm:p-6 bg-gradient-to-br from-amber-900/20 to-black/40 border border-amber-600/30 rounded-xl backdrop-blur-sm shadow-2xl">
              <h3 className="text-amber-500/90 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4">{t.suspects}</h3>
              
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
                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl mx-auto mb-1 sm:mb-2 border-2 border-gray-600/70 shadow-lg"
                        unoptimized={true}
                      />
                    </div>
                    <p className="text-gray-400 text-xs font-light truncate px-1">{character.name}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-400 font-light mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
                {gameState.characters.length} {t.suspectsDescription}
              </p>
              
              <button
                onClick={onStartInvestigation}
                className="cursor-pointer group w-full py-3 sm:py-4 bg-gradient-to-r from-amber-700/80 to-amber-600/80 hover:from-amber-600/90 hover:to-amber-500/90 text-gray-100 font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-amber-600/30 rounded-lg border border-amber-500/40 backdrop-blur-sm text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <span className="relative z-10 drop-shadow-lg playfair-font">{t.startInterrogation}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-gray-800/70 backdrop-blur-sm relative z-10">
        <div className="text-center">
          <p className="text-gray-500 text-xs sm:text-sm font-light tracking-wide">
            {t.trustNoOne} <span className="text-gray-600 hidden sm:inline">{t.truthHidesInShadows}</span>
          </p>
        </div>
      </div>
    </div>
  );
}