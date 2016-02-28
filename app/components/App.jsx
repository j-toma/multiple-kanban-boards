import AltContainer from 'alt-container';
import React from 'react';
import Groups from './Groups.jsx';
import GroupActions from '../actions/GroupActions';
import GroupStore from '../stores/GroupStore';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-group" onClick={this.addGroup}>+</button>
        <AltContainer
          stores={[GroupStore]}
          inject={{
            groups: () => GroupStore.getState().groups || []
          }}
        >
          <Groups />
        </AltContainer>
      </div>
    );
  }
  addGroup() {
    GroupActions.create({name: 'New group'});
  }
}