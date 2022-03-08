import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

export const Home = ({ }) => {
  const [sessionId, setSessionId] = useState("");
  const onSessionIdChange = (event) => {
    setSessionId(event.target.value);
  }

  const navigate = useNavigate();

  const onSessionStart = () => {
    Meteor.call('createSession', (err, result) => {
      navigate(`/${result}`);
    });
  }

  const onSessionJoin = () => {
    Meteor.call('doesSessionExist', sessionId, (err, result) => {
      if (result) {
        navigate(`/${sessionId}`);
      }else {
        alert('Session id does not exist');
      }
    })
  }

  return (
    <div>
      <h3>Pointing poker</h3>
      <button onClick={onSessionStart}>Start a session</button>
      <span> or </span>
      <input type="number" placeholder='session id' onChange={onSessionIdChange} />
      <button onClick={onSessionJoin}>Join a session</button>
    </div>
  );
}