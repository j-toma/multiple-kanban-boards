import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      className: props.className
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging,
      onMove, id, ...props} = this.props;

    return connectDragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0 : 1
      }} {...props}>{props.children}</li>
    ));
  }
}

// HERE BEGINS NOTE BEFORE PUTTING EDITABLE IN NOTES
// import React from 'react';
// import Editable from './Editable';
// import NoteActions from '../actions/NoteActions';


// export default class Note extends React.Component {
//   render() {
//     const {note, ...props} = this.props;

//     return (
//       <div {...props}> 
//         <div className="note-task" >     
//           <Editable 
//             className="note-name"
//             editing={note.editing}
//             value={note.name}
//             onEdit={this.editName}
//             onClick={this.activateNoteEdit}  />
//           <div className="note-delete">
//             <button onClick={this.deleteNote}>x</button>
//           </div>
//         </div>
//       </div>
//     );
//   }; 
//   editName = (name) => {
//     const noteId = this.props.note.id;
//     if(!name.trim()) {
//       NoteActions.update({id: noteId, editing: false});
//       return;
//     }
//     NoteActions.update({id: noteId, name, editing: false});
//   };
//   deleteNote = () => {
//     const noteId = this.props.note.id;
//     NoteActions.delete(noteId);
//   };
//   activateNoteEdit = () => {
//     const noteId = this.props.note.id;
//     NoteActions.update({id: noteId, editing: true});
//   };
// };

//  HERE BEGINS CODE OF 'NOTE' BEFORE MODELLING AFTER LANE
//   constructor(props) {
//     super(props);

//     this.state = {
//       editing: false
//     };
//   }
//   render() {
//     if(this.state.editing) {
//       return this.renderEdit();
//     }

//     return this.renderNote();
//   }
//   renderEdit = () => {
//     return <input type="text"
//       ref={
//         (e) => e ? e.selectionStart = this.props.task.length : null
//       }
//       autoFocus={true}
//       defaultValue={this.props.task}
//       onBlur={this.finishEdit}
//       onKeyPress={this.checkEnter} />;
//   };
//   renderDelete = () => {
//     return <button
//       className="delete-note"
//       onClick={this.props.onDelete}>x</button>;
//   };
//   renderNote = () => {
//     const onDelete = this.props.onDelete;

//     return (
//       <div onClick={this.edit}>
//         <span className="task">{this.props.task}</span>
//         {onDelete ? this.renderDelete() : null }
//       </div>
//     );
//   };
//   edit = () => {
//     this.setState({
//       editing: true
//     });
//   };
//   checkEnter = (e) => {
//     if(e.key === 'Enter') {
//       this.finishEdit(e);
//     }
//   };
//   finishEdit = (e) => {
//     const value = e.target.value;

//     if(this.props.onEdit) {
//       this.props.onEdit(value);

//       // Exit edit mode.
//       this.setState({
//         editing: false
//       });
//     }
//   };
// }