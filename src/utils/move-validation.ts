import Board from "../types/board";
import Position from "../interfaces/position";

export function isValidMove(board: Board, from: Position, to: Position): boolean {
  const piece = board[from.row][from.col];
  if (!piece) return false;

  switch (piece.type) {
    case 'P':
      return isValidPawnMove(board, from, to, piece.color);
    case 'R':
      return isValidRookMove(board, from, to);
    case 'N':
      return isValidKnightMove(from, to);
    case 'B':
      return isValidBishopMove(board, from, to);
    case 'Q':
      return isValidQueenMove(board, from, to);
    case 'K':
      return isValidKingMove(from, to);
    default:
      return false;
  }
}

function isValidPawnMove(board: Board, from: Position, to: Position, color: 'white' | 'black'): boolean {
  const direction = color === 'white' ? -1 : 1;
  const startRow = color === 'white' ? 6 : 1;

  // Move forward
  if (from.col === to.col && board[to.row][to.col] === null) {
    if (to.row === from.row + direction) return true;
    if (from.row === startRow && to.row === from.row + 2 * direction && board[from.row + direction][from.col] === null) return true;
  }

  // Capture diagonally
  if (Math.abs(from.col - to.col) === 1 && to.row === from.row + direction) {
    const targetPiece = board[to.row][to.col];
    if (targetPiece && targetPiece.color !== color) return true;
  }

  return false;
}

function isValidRookMove(board: Board, from: Position, to: Position): boolean {
  if (from.row !== to.row && from.col !== to.col) return false;

  const rowStep = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
  const colStep = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);

  let currentRow = from.row + rowStep;
  let currentCol = from.col + colStep;

  while (currentRow !== to.row || currentCol !== to.col) {
    if (board[currentRow][currentCol] !== null) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
}

function isValidKnightMove(from: Position, to: Position): boolean {
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isValidBishopMove(board: Board, from: Position, to: Position): boolean {
  if (Math.abs(to.row - from.row) !== Math.abs(to.col - from.col)) return false;

  const rowStep = to.row > from.row ? 1 : -1;
  const colStep = to.col > from.col ? 1 : -1;

  let currentRow = from.row + rowStep;
  let currentCol = from.col + colStep;

  while (currentRow !== to.row && currentCol !== to.col) {
    if (board[currentRow][currentCol] !== null) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
}

function isValidQueenMove(board: Board, from: Position, to: Position): boolean {
  return isValidRookMove(board, from, to) || isValidBishopMove(board, from, to);
}

function isValidKingMove(from: Position, to: Position): boolean {
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  return rowDiff <= 1 && colDiff <= 1;
}