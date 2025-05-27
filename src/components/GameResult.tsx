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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header Section with Animation */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-8xl mb-8 animate-bounce-slow">
            {isWon ? '🎉' : '💀'}
          </div>
          
          <h1 className={`text-5xl font-light mb-6 tracking-wide animate-slide-up ${
            isWon ? 'text-green-400' : 'text-red-400'
          }`}>
            {isWon ? 'Mystery Solved!' : 'Case Closed'}
          </h1>
          
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-64 mx-auto animate-expand"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Killer Reveal Card */}
          <div className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm rounded-xl p-8 transform transition-all duration-500 hover:scale-105 animate-slide-up-delayed">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-light text-white mb-6 tracking-wide">The Truth Revealed</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-32 mx-auto mb-6"></div>
            </div>
            
            {killer && (
              <div className="space-y-6">
                {/* Killer Avatar and Info */}
                <div className="flex items-center space-x-6 p-6 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <Image
                    src={avatarService.generateAvatarUrl(killer, 80)}
                    alt={killer.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg border-2 border-red-500 animate-pulse-subtle"
                    unoptimized={true}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-2">{killer.name}</h3>
                    <p className="text-amber-400 text-sm mb-1">{killer.occupation}</p>
                    <p className="text-gray-400 text-sm">{killer.age} years old</p>
                  </div>
                </div>

                {/* Killer Details */}
                <div className="space-y-4">
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <h4 className="text-red-400 text-sm font-medium uppercase tracking-wider mb-2">Motive</h4>
                    <p className="text-gray-300 font-light leading-relaxed">{killer.backstory}</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <h4 className="text-yellow-400 text-sm font-medium uppercase tracking-wider mb-2">False Alibi</h4>
                    <p className="text-gray-300 font-light leading-relaxed">{killer.alibi}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result Message and Stats */}
          <div className="space-y-6">
            {/* Result Message */}
            <div className={`p-8 rounded-xl border-2 transition-all duration-500 animate-slide-up-delayed-2 ${
              isWon 
                ? 'bg-green-900/20 border-green-500/30' 
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              <div className="text-center">
                <h3 className={`text-2xl font-light mb-4 ${isWon ? 'text-green-400' : 'text-red-400'}`}>
                  {isWon ? 'Outstanding Detective Work!' : 'The Case Remains Unsolved'}
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  {isWon 
                    ? 'You successfully identified the inconsistencies in their story and brought the killer to justice. Your sharp detective skills have solved another case.'
                    : 'The real killer got away while an innocent person was accused. Sometimes the truth is harder to find than it appears.'
                  }
                </p>
              </div>
            </div>

            {/* Investigation Stats */}
            <div className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm rounded-xl p-6 animate-slide-up-delayed-3">
              <h3 className="text-amber-400 text-lg font-medium mb-4 text-center">Investigation Summary</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <div className="text-2xl font-light text-white mb-1">{gameState.characters.length}</div>
                  <div className="text-gray-400 text-sm">Suspects</div>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <div className="text-2xl font-light text-white mb-1">{gameState.cluesFound.length}</div>
                  <div className="text-gray-400 text-sm">Clues Found</div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <div className="text-2xl font-light text-white mb-1">
                  {gameState.conversations.reduce((total, conv) => total + conv.messages.length, 0)}
                </div>
                <div className="text-gray-400 text-sm">Questions Asked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Clues Section */}
        {gameState.cluesFound.length > 0 && (
          <div className="mb-12 animate-slide-up-delayed-4">
            <div className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm rounded-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">Evidence Collected</h3>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-48 mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {gameState.cluesFound.map((clue, index) => (
                  <div 
                    key={index} 
                    className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:bg-yellow-900/30"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-black text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-yellow-200 font-light leading-relaxed">{clue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center animate-slide-up-delayed-5">
          <button
            onClick={onNewGame}
            className="group cursor-pointer px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-105 shadow-2xl rounded-lg"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Start New Case</span>
              <span className="text-lg">🔍</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}