'use client';

interface GameControlsProps {
  onGuess: () => void;
  onNewGame: () => void;
  canGuess: boolean;
  isLoading: boolean;
}

export default function GameControls({ 
  onGuess, 
  onNewGame, 
  canGuess, 
  isLoading 
}: GameControlsProps) {
  return (
    <div className="flex space-x-4 justify-center">
      <button
        onClick={onGuess}
        disabled={!canGuess || isLoading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Guessing...' : 'Get AI Guess'}
      </button>
      
      <button
        onClick={onNewGame}
        disabled={isLoading}
        className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        New Game
      </button>
    </div>
  );
}