
Template.credits.onCreated(function() {
  this.subscribe("sales");
});

Template.credits.helpers({
  sales() {
    return Sales.find({
      createdAt: Meteor.user()._id
    });
  }
});

Template.credits.events({
  'click #btnBuy' (event, template) {
    event.preventDefault();
    event.stopPropagation();
    let credits = $('#txtCredits').val();
    let s_id = Sales.insert({
      credits: credits,
      createdAt: new Date(),
      createdBy: Meteor.user()._id,
      updatedby: new Date(),
      status: 'pending',
      raw: []
    });
    window.location = 'http://app.leadsmarket.com.br:5002/credits?amount=' + credits + '&id=' + s_id;
    return false;
  }
});
