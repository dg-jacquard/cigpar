Registries = new Mongo.Collection('registries');

if (Meteor.isServer) {

  Registries.allow({
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

  Meteor.publishComposite('registries', () => {
    return {
      find: function() {
        let q = {};
        return Registries.find(q);
      }
    }
  });

}
