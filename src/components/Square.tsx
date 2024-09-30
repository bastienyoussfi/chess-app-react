import React from 'react';
import Piece from '../interfaces/piece';
import ChessPiece from './ChessPiece';

interface SquareProps {
  piece: Piece | null;
  isLight: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ piece, isLight, isSelected, onClick }) => (
  <div
    className={`w-16 h-16 flex items-center justify-center cursor-pointer
      ${isLight ? 'bg-amber-200' : 'bg-amber-700'}
      ${isSelected ? 'bg-yellow-300' : ''}
    `}
    onClick={onClick}
  >
    {piece && <ChessPiece piece={piece} />}
  </div>
);

export default Square;