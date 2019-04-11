
Template.nav.onCreated(function () {
  Meteor.subscribe("users");
});

Template.nav.helpers({

  thisUser: function() {
    var u = Meteor.user();
    console.log('thisUser', u);
    if(!u) return '';
    u = Meteor.users.findOne(Meteor.user()._id, { profile: 1, emails: 1 });
    console.log('u2', u);
    if(u.profile && u.profile['name']) return u.profile.name;
    console.log('e', u, u.emails.length, u.emails[0].address);
    if(u.emails.length) return u.emails[0].address;
    console.log('x', u);
    return '';
  }

});

Template.nav.events({

});
