import React from 'react';
import Lane from './Lane.jsx';
import BoardActions from '../actions/BoardActions';

export default ({lanes}) => {
  return (
    <div className="lanes">{lanes.map(lane =>
      <Lane
        className="lane"
        key={lane.id}
        lane={lane}
        onMove={BoardActions.move}/>
    )}</div>
  );
}