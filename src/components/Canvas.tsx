'use client';

import { useEffect } from 'react';
import { useCanvas } from '@/hooks/useCanvas';

interface CanvasProps {
  onDrawingChange?: (hasDrawing: boolean) => void;
  disabled?: boolean;
}

export default function Canvas({ onDrawingChange, disabled = false }: CanvasProps) {
  const {
    canvasRef,
    isDrawing,
    initializeCanvas,
    startDrawing,
    draw,
    stopDrawing,
    clear
  } = useCanvas();

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    startDrawing(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    draw(e.clientX, e.clientY);
    if (onDrawingChange && isDrawing) {
      onDrawingChange(true);
    }
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    e.preventDefault();
    const touch = e.touches[0];
    startDrawing(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    e.preventDefault();
    const touch = e.touches[0];
    draw(touch.clientX, touch.clientY);
    if (onDrawingChange && isDrawing) {
      onDrawingChange(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  const handleClear = () => {
    clear();
    if (onDrawingChange) {
      onDrawingChange(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={`bg-white cursor-crosshair touch-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      
      <button
        onClick={handleClear}
        disabled={disabled}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Clear Canvas
      </button>
    </div>
  );
}

export { useCanvas };