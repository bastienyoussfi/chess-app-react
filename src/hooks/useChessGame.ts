import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import GameState from '../interfaces/game-state';
import Position from '../interfaces/position';
import Move from '../interfaces/move';

export function useChessGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('getGameState');
    });

    newSocket.on('gameState', (newGameState: GameState) => {
      console.log('Received game state:', newGameState);
      setGameState(newGameState);
    });

    newSocket.on('invalidMove', () => {
      console.log('Invalid move');
      alert('Invalid move. Please try again.');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (gameState && socket) {
      const timer = setInterval(() => {
        socket.emit('updateTime', {
          color: gameState.currentPlayer,
          timeSpent: 1 // Assuming we're updating every second
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, socket]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (!gameState) return;
  
    const clickedPiece = gameState.board[row][col];
  
    if (selectedPiece) {
      const move: Move = { from: selectedPiece, to: { row, col } };
      console.log('Attempting move:', move);
      socket?.emit('movePiece', move);
      setSelectedPiece(null);
    } else if (clickedPiece && clickedPiece.color === gameState.currentPlayer) {
      console.log('Selecting piece:', { row, col });
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