
Template.adminSearchs.onCreated(function () {
  Meteor.subscribe("searchs");
  Meteor.subscribe("registries");
  let template = Template.instance();
  template.editMode = new ReactiveVar();
});

Template.adminSearchs.helpers({
  searchs() {
    return Searchs.find();
  },
  registryObj(_id, property) {
    return Registries.findOne(_id)[property];
  }
});


Template.adminSearchs.events({

});
