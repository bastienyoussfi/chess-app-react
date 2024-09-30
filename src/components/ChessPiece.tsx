import React from 'react';
import Piece from '../interfaces/piece';
import pieceSymbols from '../constants/piece-symbols';

interface ChessPieceProps {
  piece: Piece;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece }) => (
  <span className={`text-4xl ${piece.color === 'white' ? 'text-white' : 'text-black'}`}>
    {pieceSymbols[piece.type]}
  </span>
);

export default ChessPiece;