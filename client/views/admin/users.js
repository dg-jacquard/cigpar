
Template.adminUsers.onCreated(function () {
  Meteor.subscribe("users");
  Meteor.subscribe("companies");
  let template = Template.instance();
  template.editMode = new ReactiveVar();
});

Template.adminUsers.helpers({
  editMode: () => {
    let user = Template.instance().editMode.get();

    console.log('cUser var', user);

    if(user) {
      let cUser = {
        _id: user._id,
        name: user.profile? user.profile.name: '',
        email: user.emails[0].address,
        company: user.profile? user.profile.company: '',
        role: user.roles? user.roles[0]: 'normal',
        credits: user.profile? (user.profile.credits || 0): 0,
        criminal: user.profile? (user.profile.criminal || 0): 0,
        financeira: user.profile? (user.profile.financeira || 0): 0,
        completa: user.profile? (user.profile.completa || 0): 0,
        searchPrice: user.profile? (user.profile.searchPrice || 1): 1
      };
      console.log('cUser', cUser);
      return cUser;
    }
    return {};
  },
  join(a, t) {
    return a? a.join(t): '';
  },
  users() {
    let users = Meteor.users.find( {}, { fields: { "profile": 1, "emails.address": 1, "roles": 1 } });
    return users.fetch();
  },
  companies() {
    return Company.find();
  },
  companyName(_id) {
    return Company.findOne(_id).name;
  }
});


Template.adminUsers.events({
  'click .edit' (event, template) {
    event.preventDefault();
    template.editMode.set(this);
    template.$('#txtName').focus();
    window.scroll(0, 0);
  },
  'click .del' (event) {
    event.preventDefault();
    if(confirm('Deseja remover o usuário?')) {
      Meteor.users.remove(this._id);
    }
    return false;
  },
  'submit #frmUser' (event, template) {
    event.preventDefault();
    const target = event.target;

    let nUser = {};

    let cUser = template.editMode.get();

    nUser.name = target.aname.value;
    nUser.username = target.aemail.value;
    nUser.email = target.aemail.value;
    nUser.password = target.apassword.value;
    nUser.role = target.arole.value || 'normal';
    nUser.company = target.company.value;
    nUser.credits = target.credits.value;
    nUser.financeira = target.financeira.value;
    nUser.criminal = target.criminal.value;
    nUser.completa = target.completa.value;
    nUser.searchPrice = target.searchPrice.value;

    if(cUser) {
      nUser._id = cUser._id;
      template.editMode.set(null);
    }

    event.target.reset();

    Meteor.call(cUser? 'update':'register', nUser, function(error, result){
      if(result) {
       console.log('ok', result)
      }
      if(error) {
       console.log('error', error, result)
      }
    });

    // window.location = '/admin/users';
  },
});
