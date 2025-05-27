import { GameState } from '@/types/game';

interface GameResultProps {
  gameState: GameState;
  onNewGame: () => void;
}

export default function GameResult({ gameState, onNewGame }: GameResultProps) {
  const killer = gameState.characters.find(c => c.isKiller);
  const isWon = gameState.currentPhase === 'won';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-slate-800 rounded-lg shadow-xl p-8 text-center">
        <div className="text-6xl mb-6">
          {isWon ? '🎉' : '💀'}
        </div>
        
        <h1 className={`text-4xl font-bold mb-4 ${isWon ? 'text-green-400' : 'text-red-400'}`}>
          {isWon ? 'Mystery Solved!' : 'Case Closed'}
        </h1>
        
        <div className="bg-slate-700 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">The Truth Revealed</h2>
          {killer && (
            <div className="text-slate-300">
              <p className="mb-2">
                <strong>The killer was:</strong> {killer.name}
              </p>
              <p className="mb-4">
                <strong>Backstory:</strong> {killer.backstory}
              </p>
              {isWon ? (
                <p className="text-green-400">
                  Excellent detective work! You successfully identified the inconsistencies in their story.
                </p>
              ) : (
                <p className="text-red-400">
                  You accused the wrong person. Better luck next time, detective.
                </p>
              )}
            </div>
          )}
        </div>

        {gameState.cluesFound.length > 0 && (
          <div className="bg-slate-700 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Clues You Found</h3>
            <div className="space-y-2">
              {gameState.cluesFound.map((clue, index) => (
                <div key={index} className="bg-yellow-900/50 border border-yellow-600 text-yellow-200 p-2 rounded text-sm">
                  {clue}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onNewGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}