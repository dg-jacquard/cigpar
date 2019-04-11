
Template.adminSales.onCreated(function () {
  Meteor.subscribe("sales");
});

Template.adminSales.helpers({
  sales() {
    return Sales.find();
  },
  user(_id) {
    var u = Meteor.users.findOne(_id, { fields: { "profile.name": 1, "profile.credits": 1, "emails.address": 1, "roles": 1 } });
    return u.profile.name + ' - ' + u.emails[0].address;
  }
});


Template.adminSales.events({

});
