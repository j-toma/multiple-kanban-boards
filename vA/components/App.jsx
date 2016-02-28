import AltContainer from 'alt-container';
import React from 'react';
import Boards from './Boards.jsx';
import BoardActions from '../actions/BoardActions';
import BoardStore from '../stores/BoardStore';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-board" onClick={this.addBoard}>+</button>
        <AltContainer
          stores={[BoardStore]}
          inject={{
            boards: () => BoardStore.getState().boards || []
          }}
        >
          <Boards />
        </AltContainer>
      </div>
    );
  }
  addBoard() {
    BoardActions.create({name: 'Board'});
  }
}
