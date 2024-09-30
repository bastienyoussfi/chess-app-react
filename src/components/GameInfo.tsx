import React from 'react';


interface GameInfoProps {
  gameState: GameState;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameState }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderCapturedPieces = (pieces: Piece[]) => {
    return pieces.map((piece, index) => (
      <span key={index} className="text-2xl mr-1">
        {piece.type === 'P' ? '♙' : piece.type === 'R' ? '♖' : piece.type === 'N' ? '♘' : piece.type === 'B' ? '♗' : piece.type === 'Q' ? '♕' : '♔'}
      </span>
    ));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Game Info</h2>
      <p>Current Player: {gameState.currentPlayer}</p>
      <p>White Time: {formatTime(gameState.timeRemaining.white)}</p>
      <p>Black Time: {formatTime(gameState.timeRemaining.black)}</p>
      <p>Check: {gameState.isCheck ? 'Yes' : 'No'}</p>
      <p>Checkmate: {gameState.isCheckmate ? 'Yes' : 'No'}</p>
      <p>Stalemate: {gameState.isStalemate ? 'Yes' : 'No'}</p>
      <div>
        <p>Captured White Pieces:</p>
        {renderCapturedPieces(gameState.capturedPieces.white)}
      </div>
      <div>
        <p>Captured Black Pieces:</p>
        {renderCapturedPieces(gameState.capturedPieces.black)}
      </div>
    </div>
  );
};

export default GameInfo