import uuid from 'node-uuid';
import alt from '../libs/alt';
import BoardActions from '../actions/BoardActions';
import update from 'react-addons-update';


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
      if(board.lanes.includes(laneId)) {
        board.lanes = board.lanes.filter(lane => lane !== laneId);
      }
      if(board.id === boardId) {
        if(board.lanes.includes(laneId)) {
          console.warn('Already attached lane to board', board);  
        } else {
          board.lanes.push(laneId)
        }
      }
      return board;
    });
    this.setState({boards});
  }
  moveLane({sourceId, targetId}) {

    const boards = this.boards;
    const sourceBoard = boards.filter(board => board.lanes.includes(sourceId))[0];

    const targetBoard = boards.filter(board => board.lanes.includes(targetId))[0];
    const sourceLaneIndex = sourceBoard.lanes.indexOf(sourceId);
    const targetLaneIndex = targetBoard.lanes.indexOf(targetId);


    if(sourceBoard === targetBoard) {
      sourceBoard.lanes = update(sourceBoard.lanes, {
        $splice: [
          [sourceLaneIndex, 1],
          [targetLaneIndex, 0, sourceId]
        ]
      });
    } else {
      sourceBoard.lanes.splice(sourceLaneIndex, 1);
      targetBoard.lanes.splice(targetLaneIndex, 0, sourceId);
    }
    this.setState({boards});
  }
  moveBoard({sourceId, targetId}) {

    const boards = this.boards;
    const sourceBoardIndex = boards.map(e => e.id).indexOf(sourceId);
    const targetBoardIndex = boards.map(e => e.id).indexOf(targetId);
    console.log('sourceBoardIndex = ', sourceBoardIndex);
    console.log('targetBoardIndex = ', targetBoardIndex);

    const newBoards = update(boards, {
      $splice: [
        [sourceBoardIndex, 1],
        [targetBoardIndex, 0, boards[sourceBoardIndex]]
      ]
    });

    this.setState({boards: newBoards});

    // TO GET ERROR USE THIS CODE
    // const boardsClone = update(boards, {
    //   $splice: [
    //     [sourceBoardIndex, 1],
    //     [targetBoardIndex, 0, sourceId]
    //   ]
    // });

    // this.setState({boards: boardsClone});
  }
}

export default alt.createStore(BoardStore, 'BoardStore');