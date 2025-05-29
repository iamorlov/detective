'use client';

import Image from 'next/image';
import { GameState } from '@/types/game';
import { AvatarService } from '@/lib/avatar-service';

interface GameResultProps {
  gameState: GameState;
  onNewGame: () => void;
}

export default function GameResult({ gameState, onNewGame }: GameResultProps) {
  const killer = gameState.characters.find(c => c.isKiller);
  const isWon = gameState.currentPhase === 'won';
  const avatarService = new AvatarService();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-8 relative">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] pointer-events-none"></div>
      
      {/* Dark vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-70 pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header Section with Animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-6xl mb-6 opacity-80">
            {isWon ? '⚖️' : '💀'}
          </div>
          
          <h1 className={`text-4xl font-light mb-4 tracking-wide animate-slide-up drop-shadow-2xl ${
            isWon ? 'text-amber-400/90' : 'text-red-400/90'
          }`}>
            {isWon ? 'Case Closed' : 'Justice Denied'}
          </h1>
          
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent w-48 mx-auto animate-expand"></div>
        </div>

        {/* Single Column Layout */}
        <div className="space-y-6">
          {/* Killer Reveal Card */}
          <div className="bg-black/40 border border-gray-700/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl animate-slide-up-delayed">
            <div className="text-center mb-6">
              <h2 className="text-xl font-light text-gray-100 mb-4 tracking-wide drop-shadow-lg">The Truth Revealed</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent w-24 mx-auto mb-6"></div>
            </div>
            
            {killer && (
              <div className="space-y-6">
                {/* Killer Avatar and Info */}
                <div className="flex items-center space-x-6 p-6 bg-black/30 rounded-2xl border border-gray-600/30 shadow-lg">
                  <Image
                    src={avatarService.generateAvatarUrl(killer, 80)}
                    alt={killer.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-xl border-2 border-red-500/70 shadow-xl"
                    unoptimized={true}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-gray-100 mb-2 drop-shadow-lg">{killer.name}</h3>
                    <p className="text-amber-400/80 text-sm mb-1">{killer.occupation}</p>
                    <p className="text-gray-400 text-sm">{killer.age} years old</p>
                  </div>
                </div>

                {/* Killer Details */}
                <div className="space-y-4">
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-2xl backdrop-blur-sm shadow-lg">
                    <h4 className="text-red-400/90 text-sm font-medium uppercase tracking-wider mb-2 drop-shadow-lg">Motive</h4>
                    <p className="text-gray-300 font-light leading-relaxed">{killer.backstory}</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-2xl backdrop-blur-sm shadow-lg">
                    <h4 className="text-yellow-400/90 text-sm font-medium uppercase tracking-wider mb-2 drop-shadow-lg">False Alibi</h4>
                    <p className="text-gray-300 font-light leading-relaxed">{killer.alibi}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result Message */}
          <div className={`p-8 rounded-2xl border-2 backdrop-blur-sm shadow-2xl transition-all duration-500 animate-slide-up-delayed-2 ${
            isWon 
              ? 'bg-green-900/20 border-green-500/30' 
              : 'bg-red-900/20 border-red-500/30'
          }`}>
            <div className="text-center">
              <h3 className={`text-xl font-light mb-4 drop-shadow-lg ${isWon ? 'text-green-400/90' : 'text-red-400/90'}`}>
                {isWon ? 'Justice Served' : 'The Killer Walks Free'}
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                {isWon 
                  ? 'Through careful investigation and sharp deduction, you exposed the lies and brought the truth to light. Another case closed in the shadows of the city.'
                  : 'The darkness claimed another victory. An innocent soul bears the blame while the real killer disappears into the night, leaving only questions behind.'
                }
              </p>
            </div>
          </div>

          {/* Investigation Stats */}
          <div className="bg-black/40 border border-gray-700/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl animate-slide-up-delayed-3">
            <h3 className="text-amber-400/80 text-lg font-medium mb-4 text-center drop-shadow-lg">Investigation Summary</h3>
            
            <div className="text-center p-4 bg-black/30 rounded-2xl border border-gray-600/30 shadow-lg">
              <div className="text-2xl font-light text-gray-100 mb-1 drop-shadow-lg">
                {gameState.conversations.reduce((total, conv) => total + conv.messages.length, 0)}
              </div>
              <div className="text-gray-400 text-sm">Questions Asked</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-8 animate-slide-up-delayed-4">
          <button
            onClick={onNewGame}
            className="group cursor-pointer px-10 py-4 bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-105 shadow-2xl rounded-2xl border border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Start New Investigation</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}