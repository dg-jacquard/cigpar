Sales = new Mongo.Collection('sales');

if (Meteor.isServer) {

  Sales.allow({
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

  Meteor.publish('sales', () => {
    return Sales.find()
  });

}
