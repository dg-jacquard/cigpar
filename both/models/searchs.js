Searchs = new Mongo.Collection('searchs');

if (Meteor.isServer) {

  Searchs.allow({
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

  Meteor.publish('searchs', () => {
    return Searchs.find()
  });

}
