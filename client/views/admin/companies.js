
Template.adminCompanies.onCreated(function () {
  Meteor.subscribe("companies");
  let template = Template.instance();
  template.editMode = new ReactiveVar();
});

Template.adminCompanies.helpers({
  editMode: () => {
    let company = Template.instance().editMode.get();

    console.log('cCompany var', company);

    if(company) {
      let cCompany = {
        _id: company._id,
        name: company.name,
        criminal: company.criminal || 0,
        financeira: company.financeira || 0,
        completa: company.completa || 0
      };
      console.log('cCompany', cCompany);
      return cCompany;
    }
    return {};
  },
  companies() {
    let companies = Company.find({});
    return companies.fetch();
  }
});


Template.adminCompanies.events({
  'click .edit' (event, template) {
    event.preventDefault();
    template.editMode.set(this);
    template.$('#txtCName').focus();
    window.scroll(0, 0);
  },
  'click .del' (event) {
    event.preventDefault();
    if(confirm('Deseja remover a empresa?')) {
      Company.remove(this._id);
    }
    return false;
  },
  'submit #frmCompany' (event, template) {
    event.preventDefault();
    const target = event.target;

    let nCompany = {};

    let cCompany = template.editMode.get();

    nCompany.name = target.aname.value;
    nCompany.criminal = Math.floor(target.acriminal.value);
    nCompany.financeira = Math.floor(target.afinanceira.value);
    nCompany.completa = Math.floor(target.acompleta.value);

    if(cCompany) {
      nCompany._id = cCompany._id;
      Company.update({_id: nCompany._id}, { $set: nCompany } );
      template.editMode.set(null);
    } else {
      Company.insert(nCompany);
    }

    event.target.reset();


    // window.location = '/admin/users';
  },
});
