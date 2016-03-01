import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import BoardActions from '../actions/BoardActions';
import Editable from './Editable.jsx';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';


const laneTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.board.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.board.lanes.length) {
      BoardActions.attachToBoard({
        boardId: targetProps.board.id,
        laneId: sourceId
      });
    }
  }
}

@DropTarget(ItemTypes.LANE, laneTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Board extends React.Component {
  render() {
    const {connectDropTarget, board, ...props} = this.props;

    return connectDropTarget(
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
  // editLane(newName) {
  //   // Don't modify if trying set an empty value
  //   if(!newName.trim()) {
  //     return;
  //   }

  //   LaneActions.update({newName});
  // }
  addLane = (e) => {
    e.stopPropagation();
    const boardId = this.props.board.id; 
    const lane = LaneActions.create({name: 'Lane'});
    BoardActions.attachToBoard({
      laneId: lane.id,
      boardId
    });
  };
  // deleteLane = (laneId, e) => {
  //   e.stopPropagation();
  //   const groupId = this.props.group.id;

  //   GroupActions.detachFromGoup({groupId, laneId});
  //   LaneActions.delete(laneId);
  // };
  editName = (name) => {
    const boardId = this.props.board.id;
    if(!name.trim()) {
      BoardActions.updated({id: boardId, editing: false});
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
  // activateLaneEdit(id) {
  //   LaneActions.update({id, editing: true});
  // }
}