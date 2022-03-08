import { Meteor } from 'meteor/meteor';
import { SessionsCollection } from './sessions';

export const generateRandomNumber = () => {
  const r1 = Math.floor(Math.random() * 100) + 1;
  const r2 = Math.floor(Math.random() * 100) + 1;
  const number = Math.pow(r1, 2) * r2 + r1;
  return number;
}

Meteor.methods({
  createSession() {
    const number = generateRandomNumber();
    SessionsCollection.insert({ _id: `${number}`, players: [], desc: "" });
    return number;
  },
  doesSessionExist(_id) {
    const [session] = SessionsCollection.find({ _id }).fetch();
    return !!session._id;
  },
  addSessionPlayer(_id, player) {
    const [session] = SessionsCollection.find({ _id }).fetch();
    const players = [...session.players, player];
    SessionsCollection.update({ _id }, { $set: { players } });
  },
  clearVotes(_id) {
    const [session] = SessionsCollection.find({ _id }).fetch();
    const players = session.players.map((p) => {
      delete p.point;
      return p;
    });
    SessionsCollection.update({ _id }, { $set: { players, desc: "" } });
  },
  updatePlayerPoint(_id, playerId, point) {
    const [session] = SessionsCollection.find({ _id }).fetch();
    const players = session.players.map((p) => {
      if (playerId == p.playerId) {
        p.point = point;
      }
      return p;
    });
    SessionsCollection.update({ _id }, { $set: { players } });
  },
  updateDescription(_id, description) {
    SessionsCollection.update({ _id }, { $set: { desc: description } });
  }
})