import React from 'react';
import Group from './Group.jsx';

export default ({groups}) => {
  return (
    <div className="groups">{groups.map(group =>
      <Group className="group" key={group.id} group={group} />
    )}</div>
  );
}