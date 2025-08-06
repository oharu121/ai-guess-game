export interface GameState {
  isDrawing: boolean;
  currentGuess: string | null;
  guessHistory: string[];
  score: number;
  isLoading: boolean;
}

export interface DrawingPoint {
  x: number;
  y: number;
}

export interface GuessResponse {
  guess: string;
  timestamp: number;
  error?: string;
}

export interface CanvasSettings {
  strokeWidth: number;
  strokeColor: string;
  backgroundColor: string;
}