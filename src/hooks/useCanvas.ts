import { useRef, useCallback, useState } from 'react';
import { DrawingPoint } from '@/lib/types';
import { setupCanvas, clearCanvas, drawLine, getCanvasCoordinates, resizeCanvas } from '@/lib/canvas-utils';

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<DrawingPoint | null>(null);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    return setupCanvas(canvas);
  }, []);

  const startDrawing = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = getCanvasCoordinates(canvas, clientX, clientY);
    setIsDrawing(true);
    setLastPoint(point);
  }, []);

  const draw = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing || !lastPoint) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPoint = getCanvasCoordinates(canvas, clientX, clientY);
    drawLine(ctx, lastPoint, currentPoint);
    setLastPoint(currentPoint);
  }, [isDrawing, lastPoint]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    setLastPoint(null);
  }, []);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    clearCanvas(canvas);
  }, []);

  const getImageData = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    return resizeCanvas(canvas);
  }, []);

  return {
    canvasRef,
    isDrawing,
    initializeCanvas,
    startDrawing,
    draw,
    stopDrawing,
    clear,
    getImageData
  };
}