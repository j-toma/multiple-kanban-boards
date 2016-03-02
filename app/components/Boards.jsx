import React from 'react';
import Board from './Board.jsx';
import BoardActions from '../actions/BoardActions';


export default ({boards}) => {
  return (
    <div className="boards">{boards.map(board =>
      <Board
        className="board"
        key={board.id}
        board={board}
        onMove={BoardActions.moveBoard} />
    )}</div>
  );
}