import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Board from '../types/board';
import Position from '../interfaces/position';
import Move from '../interfaces/move';

export function useChessGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('gameState', (newGameState: GameState) => {
      setGameState(newGameState);
    });

    newSocket.on('invalidMove', () => {
      alert('Invalid move. Please try again.');
    });

    newSocket.on('gameOver', (result: string) => {
      alert(`Game Over: ${result}`);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (gameState) {
      const timer = setInterval(() => {
        socket?.emit('updateTime', gameState.currentPlayer);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, socket]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (!gameState) return;

    if (selectedPiece) {
      const move: Move = { from: selectedPiece, to: { row, col } };
      socket?.emit('movePiece', move);
      setSelectedPiece(null);
    } else if (gameState.board[row][col] && gameState.board[row][col]?.color === gameState.currentPlayer) {
      setSelectedPiece({ row, col });
    }
  }, [selectedPiece, gameState, socket]);

  const resetGame = useCallback(() => {
    socket?.emit('resetGame');
  }, [socket]);

  const undoMove = useCallback(() => {
    socket?.emit('undoMove');
  }, [socket]);

  const promotePawn = useCallback((pieceType: 'Q' | 'R' | 'B' | 'N') => {
    socket?.emit('promotePawn', pieceType);
  }, [socket]);

  return { gameState, selectedPiece, handleSquareClick, resetGame, undoMove, promotePawn };
}