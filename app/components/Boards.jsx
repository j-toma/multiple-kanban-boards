import React from 'react';
import Board from './Board.jsx';

export default ({boards}) => {
  return (
    <div className="boards">{boards.map(board =>
      <Board className="board" key={board.id} board={board} />
    )}</div>
  );
}