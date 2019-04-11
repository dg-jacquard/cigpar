
Template.adminGeneral.onCreated(function () {
  Meteor.subscribe("namas");
  let template = Template.instance();
});

Template.adminGeneral.helpers({
  config() {
    return Namas.findOne({ key: "main" });
  }
});


Template.adminGeneral.events({
  'submit #frmGeneral' (event, template) {
    event.preventDefault();
    const target = event.target;

    let g = Namas.findOne();
    console.log('g', g);
    if(!g) {
      Namas.insert({
        key: 'main',
        price: target.price.value
      });
    } else {
      Namas.update(g._id, {
        $set: {
          price: target.price.value
        }
      });
    }
  },
});
