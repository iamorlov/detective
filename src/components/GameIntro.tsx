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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-white tracking-wide">CASE FILE</h1>
            <div className="h-px bg-amber-400 w-16 mt-1"></div>
          </div>
          <div className="text-amber-400 text-sm font-light">
            {gameState.setting}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid md:grid-cols-3 gap-8">
          {/* Case details */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-light text-white mb-6 tracking-wide">
                The Investigation Begins
              </h2>
              <div className="h-px bg-gradient-to-r from-amber-400 to-transparent mb-8"></div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-800/50 border border-gray-700/30 backdrop-blur-sm">
                <h3 className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-3">Victim</h3>
                <p className="text-gray-200 font-light">{gameState.victim}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/30 border border-gray-700/20">
                  <h4 className="text-amber-400 text-xs uppercase tracking-wider mb-2">Weapon</h4>
                  <p className="text-gray-200 text-sm font-light">{gameState.murderWeapon}</p>
                </div>
                <div className="p-4 bg-gray-800/30 border border-gray-700/20">
                  <h4 className="text-amber-400 text-xs uppercase tracking-wider mb-2">Location</h4>
                  <p className="text-gray-200 text-sm font-light">{gameState.murderLocation}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-800/30 border border-gray-700/20">
                <h4 className="text-amber-400 text-xs uppercase tracking-wider mb-2">Time of Death</h4>
                <p className="text-gray-200 text-sm font-light">{gameState.murderTime}</p>
              </div>

              <div className="p-6 bg-gray-800/50 border border-gray-700/30 backdrop-blur-sm">
                <h3 className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-4">Case Background</h3>
                <p className="text-gray-300 font-light leading-relaxed">{gameState.backstory}</p>
              </div>
            </div>
          </div>

          {/* Suspects and action */}
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-500/20">
              <h3 className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-4">Suspects</h3>
              
              {/* Character Avatars Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {gameState.characters.map((character) => (
                  <div key={character.id} className="text-center">
                    <Image
                      src={avatarService.generateAvatarUrl(character, 64)}
                      alt={character.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-gray-600"
                      unoptimized={true} // Since we're using external SVG API
                    />
                    <p className="text-gray-300 text-xs">{character.name}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-300 font-light mb-6">
                {gameState.characters.length} individuals were present at the scene. Question them carefully - one of them is the killer.
              </p>
              
              <button
                onClick={onStartInvestigation}
                className="cursor-pointer group w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                <span className="relative z-10">Start Interrogation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700/50">
        <div className="text-center">
          <p className="text-gray-500 text-sm font-light">
            Trust no one. Question everything. Find the truth.
          </p>
        </div>
      </div>
    </div>
  );
}