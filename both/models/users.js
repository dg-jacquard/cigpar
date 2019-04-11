if (Meteor.isServer) {

  Meteor.publish('users', function() {
    return Meteor.users.find({}, {
      fields: {
        profile: 1,
        emails: 1,
        roles: 1
      }
    });
  });

}

Meteor.users.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Meteor.users.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});
