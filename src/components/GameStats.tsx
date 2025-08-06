'use client';

interface GameStatsProps {
  totalGuesses: number;
  sessionStartTime: number;
}

export default function GameStats({ totalGuesses, sessionStartTime }: GameStatsProps) {
  const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
  const minutes = Math.floor(sessionDuration / 60);
  const seconds = sessionDuration % 60;

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Game Stats</h3>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-blue-600">{totalGuesses}</p>
          <p className="text-sm text-gray-600">Total Guesses</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
          <p className="text-sm text-gray-600">Session Time</p>
        </div>
      </div>
    </div>
  );
}