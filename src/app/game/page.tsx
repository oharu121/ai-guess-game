'use client';

import { useState, useCallback } from 'react';
import Canvas from '@/components/Canvas';
import GuessDisplay from '@/components/GuessDisplay';
import GameControls from '@/components/GameControls';
import GameStats from '@/components/GameStats';
import { GameState, GuessResponse } from '@/lib/types';

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>({
    isDrawing: false,
    currentGuess: null,
    guessHistory: [],
    score: 0,
    isLoading: false
  });
  
  const [hasDrawing, setHasDrawing] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);

  const handleGuess = useCallback(async () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    setGameState(prev => ({ ...prev, isLoading: true }));
    setError(null);

    try {
      const imageData = canvas.toDataURL('image/png');
      
      const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GuessResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setGameState(prev => ({
        ...prev,
        currentGuess: data.guess,
        guessHistory: [...prev.guessHistory, data.guess],
        score: prev.score + 1,
        isLoading: false
      }));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get guess';
      setError(errorMessage);
      setGameState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const handleNewGame = useCallback(() => {
    setGameState({
      isDrawing: false,
      currentGuess: null,
      guessHistory: [],
      score: 0,
      isLoading: false
    });
    setHasDrawing(false);
    setError(null);
    
    // Clear the canvas
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI Pictionary
          </h1>
          <p className="text-gray-600">
            Draw something and let the AI guess what it is!
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Canvas
              onDrawingChange={setHasDrawing}
              disabled={gameState.isLoading}
            />
            
            <GameControls
              onGuess={handleGuess}
              onNewGame={handleNewGame}
              canGuess={hasDrawing && !gameState.isLoading}
              isLoading={gameState.isLoading}
            />
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            <GuessDisplay
              guess={gameState.currentGuess}
              isLoading={gameState.isLoading}
              guessHistory={gameState.guessHistory}
            />
            
            <GameStats
              totalGuesses={gameState.guessHistory.length}
              sessionStartTime={sessionStartTime}
            />
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Powered by Google Gemini AI • Built with Next.js
          </p>
        </footer>
      </div>
    </div>
  );
}