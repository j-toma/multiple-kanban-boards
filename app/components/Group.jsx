import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import GroupActions from '../actions/GroupActions';
import Editable from './Editable.jsx';


export default class Group extends React.Component {
  render() {
    const {group, ...props} = this.props;

    return (
      <div {...props}>
        <div className="group-header" onClick={this.activateGroupEdit}>
          <div className="group-add-lane">
            <button onClick={this.addLane}>+</button>
          </div>
          <Editable
            className="group-name"
            editing={group.editing}
            value={group.name}
            onEdit={this.editName} />
          <div className="group-delete">
            <button onClick={this.deleteGroup}>x</button>
          </div>
        </div>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getLanesByIds(group.lanes)
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
    const groupId = this.props.group.id; 
    const lane = LaneActions.create({name: 'Lane'});
    GroupActions.attachToGroup({
      laneId: lane.id,
      groupId
    });
  };
  // deleteLane = (laneId, e) => {
  //   e.stopPropagation();
  //   const groupId = this.props.group.id;

  //   GroupActions.detachFromGoup({groupId, laneId});
  //   LaneActions.delete(laneId);
  // };
  editName = (name) => {
    const groupId = this.props.group.id;
    if(!name.trim()) {
      GroupActions.updated({id: groupId, editing: false});
      return;
    }
    GroupActions.update({id: groupId, name, editing: false});
  };
  deleteGroup = () => {
    const groupId = this.props.group.id;
    GroupActions.delete(groupId);
  };
  activateGroupEdit = () => {
    const groupId = this.props.group.id;
    GroupActions.update({id: groupId, editing: true});
  };
  // activateLaneEdit(id) {
  //   LaneActions.update({id, editing: true});
  // }
}