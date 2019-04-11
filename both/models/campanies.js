Company = new Mongo.Collection('companies');

if (Meteor.isServer) {

  Company.allow({
    insert: function(userId, doc) {
      return true;
    },
    update(userId, doc, fields, modifier) {
      return true;
    },
    remove(userId, doc) {
      return true;
    }
  });

  Meteor.publish('companies', () => {
    return Company.find()
  });

}
