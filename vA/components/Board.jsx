import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import BoardActions from '../actions/BoardActions';
import Editable from './Editable.jsx';


export default class Board extends React.Component {
  render() {
    const {board, ...props} = this.props;

    return (
      <div {...props}>
        <div className="board-header" onClick={this.activateBoardEdit}>
          <div className="board-add-lane">
            <button onClick={this.addLane}>+</button>
          </div>
          <Editable 
            className="board-name"
            editing={board.editing}
            value={board.name}
            onEdit={this.editName} />
          <div className="board-delete">
            <button onClick={this.deleteBoard}>x</button>
          </div>
        </div>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getLanesByIds(board.lanes)
          }}
        >
          <Lanes />
        </AltContainer>
      </div>
    );
  }
  addLane = (e) => {
    e.stopPropagation();
    const boardId = this.props.board.id;
    const lane = LaneActions.create({value: 'Lane'});
    BoardActions.attachToBoard({
      laneId: lane.id,
      boardId
    });
  };
  editName = (name) => {
    const boardId = this.props.board.id;
    if(!name.trim()) {
      BoardActions.update({id: boardId, editing: false});
      return;
    }
    BoardActions.update({id: boardId, name, editing: false});
  };
  deleteBoard = () => {
    const boardId = this.props.board.id;
    BoardActions.delete(boardId);
  };
  activateBoardEdit = () => {
    const boardId = this.props.board.id;
    BoardActions.update({id: boardId, editing: true});
  };
}