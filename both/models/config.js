Namas = new Mongo.Collection('namas');

if (Meteor.isServer) {

  Namas.allow({
    'insert': function(userId, doc) {
      return true;
    },
    update(userId, doc, fields, modifier) {
      return true;
    },
    remove(userId, doc) {
      return true;
    }
  });

  var b = 32;
  var c = 15;

  Meteor.publish("namas", function() {
    return Namas.find();
  });

}
