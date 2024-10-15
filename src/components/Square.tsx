import React, { useEffect, useState } from 'react';
import Piece from '../interfaces/piece';
import ChessPiece from './ChessPiece';

interface SquareProps {
  piece: Piece | null;
  isLight: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ piece, isLight, isSelected, onClick }) => {
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (isSelected) {
      const timer = setTimeout(() => setIsInvalid(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSelected]);

  const handleClick = () => {
    onClick();
    if (isSelected) {
      setIsInvalid(true);
    }
  };

  return (
    <div
      className={`w-16 h-16 flex items-center justify-center cursor-pointer
        ${isLight ? 'bg-amber-200' : 'bg-amber-700'}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isInvalid ? 'ring-2 ring-red-500' : ''}
        transition-all duration-300
      `}
      onClick={handleClick}
    >
      {piece && (
        <span className={`text-4xl ${piece.color === 'white' ? 'text-white' : 'text-black'}`}>
          {getPieceSymbol(piece.type)}
        </span>
      )}
    </div>
  );
};

function getPieceSymbol(type: string): string {
  const symbols: { [key: string]: string } = {
    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
  };
  return symbols[type] || '';
}

export default Square;