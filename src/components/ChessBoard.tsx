import React, { useEffect } from 'react';
import { useChessGame } from '../hooks/useChessGame';
import Square from './Square';
import MoveHistory from './MoveHistory';
import GameInfo from './GameInfo';

const ChessBoard: React.FC = () => {
  const { gameState, selectedPiece, handleSquareClick, resetGame, undoMove, promotePawn } = useChessGame();

  useEffect(() => {
    console.log('Game state updated:', gameState);
  }, [gameState]);

  if (!gameState) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Chess Game</h1>
      <div className="flex gap-8">
        <div className="grid grid-cols-8 gap-0.5 p-2 bg-orange-800 rounded-lg shadow-lg">
          {gameState.board.map((row, rowIndex) => (
            row.map((piece, colIndex) => (
              <Square
                key={`${rowIndex}-${colIndex}`}
                piece={piece}
                isLight={(rowIndex + colIndex) % 2 === 0}
                isSelected={selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              />
            ))
          ))}
        </div>
        <div>
          <GameInfo gameState={gameState} />
          <MoveHistory moves={gameState.moveHistory} onUndoMove={undoMove} />
          <button 
            onClick={resetGame}
            className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;