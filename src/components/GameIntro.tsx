'use client';

import Image from 'next/image';
import { GameState } from '@/types/game';
import { AvatarService } from '@/lib/avatar-service';

interface GameIntroProps {
  gameState: GameState;
  onStartInvestigation: () => void;
}

export default function GameIntro({ gameState, onStartInvestigation }: GameIntroProps) {
  const avatarService = new AvatarService();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 flex flex-col relative overflow-hidden">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>
      
      {/* Dark vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-70 pointer-events-none"></div>
      
      {/* Atmospheric shadows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-black/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-black/60 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="p-6 border-b border-gray-800/70 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-gray-200 tracking-wide drop-shadow-lg">CASE FILE</h1>
            <div className="h-px bg-amber-500/70 w-16 mt-1 shadow-lg"></div>
          </div>
          <div className="text-amber-500/80 text-sm font-light tracking-wider">
            {gameState.setting}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="max-w-6xl w-full grid md:grid-cols-3 gap-8">
          {/* Case details */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-light text-gray-100 mb-6 tracking-wide drop-shadow-xl">
                The Investigation Begins
              </h2>
              <div className="h-px bg-gradient-to-r from-amber-500/60 to-transparent mb-8 shadow-lg"></div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-black/40 border border-gray-700/50 rounded-xl backdrop-blur-sm shadow-2xl">
                <h3 className="text-amber-500/90 text-sm font-medium uppercase tracking-wider mb-3">Victim</h3>
                <p className="text-gray-300 font-light">{gameState.victim}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/30 border border-gray-700/40 rounded-lg shadow-xl">
                  <h4 className="text-amber-500/80 text-xs uppercase tracking-wider mb-2">Weapon</h4>
                  <p className="text-gray-300 text-sm font-light">{gameState.murderWeapon}</p>
                </div>
                <div className="p-4 bg-black/30 border border-gray-700/40 rounded-lg shadow-xl">
                  <h4 className="text-amber-500/80 text-xs uppercase tracking-wider mb-2">Location</h4>
                  <p className="text-gray-300 text-sm font-light">{gameState.murderLocation}</p>
                </div>
              </div>

              <div className="p-4 bg-black/30 border border-gray-700/40 rounded-lg shadow-xl">
                <h4 className="text-amber-500/80 text-xs uppercase tracking-wider mb-2">Time of Death</h4>
                <p className="text-gray-300 text-sm font-light">{gameState.murderTime}</p>
              </div>

              <div className="p-6 bg-black/40 border border-gray-700/50 rounded-xl backdrop-blur-sm shadow-2xl">
                <h3 className="text-amber-500/90 text-sm font-medium uppercase tracking-wider mb-4">Case Background</h3>
                <p className="text-gray-400 font-light leading-relaxed">{gameState.backstory}</p>
              </div>
            </div>
          </div>

          {/* Suspects and action */}
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-amber-900/20 to-black/40 border border-amber-600/30 rounded-xl backdrop-blur-sm shadow-2xl">
              <h3 className="text-amber-500/90 text-sm font-medium uppercase tracking-wider mb-4">Suspects</h3>
              
              {/* Character Avatars Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {gameState.characters.map((character) => (
                  <div key={character.id} className="text-center">
                    <div className="relative">
                      <Image
                        src={avatarService.generateAvatarUrl(character, 64)}
                        alt={character.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-xl mx-auto mb-2 border-2 border-gray-600/70 shadow-lg"
                        unoptimized={true}
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                    </div>
                    <p className="text-gray-400 text-xs font-light">{character.name}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-400 font-light mb-6 leading-relaxed">
                {gameState.characters.length} individuals were present at the scene. Question them carefully - one of them is the killer.
              </p>
              
              <button
                onClick={onStartInvestigation}
                className="cursor-pointer group w-full py-4 bg-gradient-to-r from-amber-700/80 to-amber-600/80 hover:from-amber-600/90 hover:to-amber-500/90 text-gray-100 font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-amber-600/30 rounded-lg border border-amber-500/40 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <span className="relative z-10 drop-shadow-lg">Start Interrogation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-800/70 backdrop-blur-sm relative z-10">
        <div className="text-center">
          <p className="text-gray-500 text-sm font-light tracking-wide">
            Trust no one. Question everything. <span className="text-gray-600">The truth hides in shadows...</span>
          </p>
        </div>
      </div>
    </div>
  );
}