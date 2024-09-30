import React from 'react';
import Move from '../interfaces/move';

interface MoveHistoryProps {
    moves: Move[];
    onUndoMove: () => void;
  }
  
  const MoveHistory: React.FC<MoveHistoryProps> = ({ moves, onUndoMove }) => {
    return (
      <div className="mt-4 p-4 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Move History</h2>
          <button 
            onClick={onUndoMove}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Undo Last Move
          </button>
        </div>
        <ul className="list-disc pl-5 max-h-60 overflow-y-auto">
          {moves.map((move, index) => (
            <li key={index}>
              {`${index + 1}. ${String.fromCharCode(97 + move.from.col)}${8 - move.from.row} to ${String.fromCharCode(97 + move.to.col)}${8 - move.to.row}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MoveHistory;