import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Board from '../types/board';
import Position from '../interfaces/position';
import Move from '../interfaces/move';

export function useChessGame() {
  const [board, setBoard] = useState<Board>([]);
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('gameState', ({ board, moveHistory }) => {
      setBoard(board);
      setMoveHistory(moveHistory);
      setCurrentPlayer(moveHistory.length % 2 === 0 ? 'white' : 'black');
    });

    newSocket.on('invalidMove', () => {
      alert('Invalid move. Please try again.');
    });

    newSocket.on('undoFailed', () => {
      alert('Cannot undo move');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (selectedPiece) {
      const move: Move = { from: selectedPiece, to: { row, col } };
      socket?.emit('movePiece', move);
      setSelectedPiece(null);
    } else if (board[row][col] && board[row][col]?.color === currentPlayer) {
      setSelectedPiece({ row, col });
    }
  }, [selectedPiece, board, currentPlayer, socket]);

  const resetGame = useCallback(() => {
    socket?.emit('resetGame');
  }, [socket]);

  const undoMove = useCallback(() => {
    socket?.emit('undoMove');
  }, [socket]);

  return { board, selectedPiece, currentPlayer, moveHistory, handleSquareClick, resetGame, undoMove };
}