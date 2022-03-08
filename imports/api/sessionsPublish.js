import { Meteor } from 'meteor/meteor';
import { SessionsCollection } from './sessions';

Meteor.publish('findSession', (_id) => {
  return SessionsCollection.find({ _id });
})