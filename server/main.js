import { Meteor } from 'meteor/meteor';
import { SessionsCollection } from '../imports/api/sessions';
import '/imports/api/sessions';
import '/imports/api/sessionsMethod';
import '/imports/api/sessionsPublish';

Meteor.startup(() => {
  SessionsCollection.remove({});
});
