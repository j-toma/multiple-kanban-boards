import uuid from 'node-uuid';
import alt from '../libs/alt';
import GroupActions from '../actions/GroupActions';

class GroupStore {
  constructor() {
    this.bindActions(GroupActions);
    this.groups = [];
  }
  create(group) {
    const groups = this.groups;
    group.id = uuid.v4();
    group.lanes = group.lanes || [];
    this.setState({
      groups: groups.concat(group)
    });
  }
  update(updatedGroup) {
    const groups = this.groups.map(group => {
      if(group.id === updatedGroup.id) {
        return Object.assign({}, group, updatedGroup);
      }
      return group;
    });
    this.setState({groups});
  }
  delete(id) {
    this.setState({
      groups: this.groups.filter(group => group.id !== id)
    });
  }
  attachToGroup({groupId, laneId}) {
    const groups = this.groups.map(group => {
      if(group.id === groupId) {
        if(group.lanes.includes(laneId)) {
          console.warn('Already attached lane to group', group);  
        } else {
          group.lanes.push(laneId)
        }
      }
      return group;
    });
    this.setState({groups});
  }
  detachFromGroup({laneId, noteId}) {
    const groups = this.groups.map(group => {
      if(group.id === groupId) {
        group.notes = group.notes.filter(lane => lane !== laneId);
      }
    });
    this.setState({groups});
  }
}

export default alt.createStore(GroupStore, 'GroupStore');