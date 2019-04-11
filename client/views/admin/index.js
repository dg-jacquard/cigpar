
Template.admin.onCreated(() => {
  Session.setDefaultPersistent('adminTab', 1);
  let u = Meteor.user();
  if(!u || !u._id || !Roles.userIsInRole(Meteor.user()._id, 'admin')) {
    window.location = '/';
  }
});

Template.admin.events({
  'click .nav li a' (event, template) {
    Session.setPersistent('adminTab', +event.target.dataset.tab);
  }
});

Template.admin.helpers({
  active: function(tab) {
    if(Session.equals("adminTab", tab)) {
      return "active";
    }
  }
})
