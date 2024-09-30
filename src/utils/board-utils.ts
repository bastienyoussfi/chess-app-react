import Board from "../types/board";
import Position from "../interfaces/position";

export function cloneBoard(board: Board): Board {
  return JSON.parse(JSON.stringify(board));
}

export function movePiece(board: Board, from: Position, to: Position): Board {
  const newBoard = cloneBoard(board);
  newBoard[to.row][to.col] = newBoard[from.row][from.col];
  newBoard[from.row][from.col] = null;
  return newBoard;
}