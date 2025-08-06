'use client';

interface GuessDisplayProps {
  guess: string | null;
  isLoading: boolean;
  guessHistory: string[];
}

export default function GuessDisplay({ guess, isLoading, guessHistory }: GuessDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[100px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-600">AI is thinking...</span>
          </div>
        ) : guess ? (
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-1">AI guesses:</p>
            <p className="text-2xl font-bold text-blue-600">{guess}</p>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            Draw something and click &quot;Get AI Guess&quot; to see what the AI thinks it is!
          </p>
        )}
      </div>

      {guessHistory.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Previous Guesses:</h3>
          <div className="flex flex-wrap gap-2">
            {guessHistory.slice(-5).map((prevGuess, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white rounded text-sm text-gray-600 border"
              >
                {prevGuess}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}