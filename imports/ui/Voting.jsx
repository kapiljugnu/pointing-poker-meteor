import React from 'react';

export const Voting = ({ sessionId, name, onPointClick, onClearVotes, onDescriptionChange, description }) => <div>
  <div>Session id: {sessionId}</div>
  <h3>{name}</h3>
  <p>Description</p>
  <div><textarea onChange={onDescriptionChange} value={description} cols="30" rows="10"></textarea></div>
  <button onClick={onClearVotes}>Clear votes</button>
  <hr />
  <button onClick={() => onPointClick(1)}>1 point</button>&nbsp;
  <button onClick={() => onPointClick(2)}>2 point</button>&nbsp;
  <button onClick={() => onPointClick(3)}>3 point</button>&nbsp;
  <button onClick={() => onPointClick(5)}>5 point</button>&nbsp;
</div>