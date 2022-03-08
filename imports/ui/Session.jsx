import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { SessionsCollection } from '../api/sessions';
import { Voting } from './Voting';
import { Players } from './Players';
import { generateRandomNumber } from '../api/sessionsMethod';

export const Session = ({ }) => {
  const navigate = useNavigate();
  const { sid } = useParams();

  const [name, setName] = useState("");
  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const [playerId, setPlayerId] = useState("");

  const isSessionLoading = useSubscribe('findSession', sid);
  const [_session] = useFind(() => SessionsCollection.find());

  const onJoin = () => {
    if (name) {
      const pid = generateRandomNumber();
      setPlayerId(`${pid}`);
      const player = { playerId: pid, name };
      Meteor.call('addSessionPlayer', sid, player);
    }
  }

  const onPointClick = (number) => {
    Meteor.call('updatePlayerPoint', sid, playerId, number);
  }

  const onClearVotes = () => {
    Meteor.call('clearVotes', sid);
  }

  const onDescChange = (event) => {
    const value = event.target.value;
    Meteor.call('updateDescription', sid, value);
  }

  if (isSessionLoading()) {
    return 'Please wait...'
  }

  if (!_session?._id) {
    navigate('/');
    return null;
  }

  if (sid && playerId) {
    return <>
      <Voting
        sessionId={sid}
        name={name}
        onPointClick={onPointClick}
        onDescriptionChange={onDescChange}
        onClearVotes={onClearVotes}
        description={_session.desc}
      />
      <br />
      <Players players={_session.players} />
    </>
  }

  return (
    <div>
      <input type="text" placeholder="enter name" onChange={onNameChange} value={name} />
      <button onClick={onJoin}>Join a session</button>
    </div>
  )
}