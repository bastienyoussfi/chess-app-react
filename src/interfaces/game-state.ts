import Board from '../types/board';
import Move from './move';
import Piece from './piece';

interface GameState {
    board: Board;
    currentPlayer: 'white' | 'black';
    moveHistory: Move[];
    isCheck: boolean;
    isCheckmate: boolean;
    isStalemate: boolean;
    capturedPieces: {
      white: Piece[];
      black: Piece[];
    };
    timeRemaining: {
      white: number;
      black: number;
    };
  }

export default GameState;