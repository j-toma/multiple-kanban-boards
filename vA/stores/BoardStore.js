import uuid from 'node-uuid';
import alt from '../libs/alt';
import BoardActions from '../actions/BoardActions';

class BoardStore {
  constructor() {
    this.bindActions(BoardActions);
    this.boards = [];
  }
  create(board) {
    const boards = this.boards;
    board.id = uuid.v4();
    board.lanes = board.lanes || [];
    this.setState({
      boards: boards.concat(board)
    });
  }
  update(updatedBoard) {
    const boards = this.boards.map(board => {
      if(board.id === updatedBoard.id) {
        return Object.assign({}, board, updatedBoard);
      }
      return board;
    });
    this.setState({boards});
  }
  delete(id) {
    this.setState({
      boards: this.boards.filter(board => board.id !== id)
    });
  }
  attachToBoard({boardId, laneId}) {
    const boards = this.boards.map(board => {
      if(board.id === boardId) {
        if(board.lanes.includes(laneId)) {
          console.warn('Already attached note to board', boards);
        } else {
          board.lanes.push(laneId);
        }
      }
      return board;
    });
    this.setState({boards});
  }
  detachFromBoard({boardId, laneId}) {
    const boards = this.boards.map(board => {
      if(board.id === boardId) {
        board.lanes = board.lanes.filter(lane => lane !== laneId);
      }
      return board;
    });
    this.setState({boards});
  }
}

export default alt.createStore(BoardStore, 'BoardStore');