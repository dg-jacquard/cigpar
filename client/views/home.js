

Template.home.onCreated(function () {

  let template = Template.instance();

  this.subscribe("registries");
  this.subscribe("namas");
  this.subscribe("companies");

  template.currentPage = new ReactiveVar();
  template.dataReady = new ReactiveVar();

  template.currentPage.set(1);

  template.autorun( () => {
    let handle = template.subscribe('registries', () => {

    });
    template.dataReady.set(handle.ready());
  });

});

Template.pageLimit = 70;

Template.setPage = (page) => {

  let template = Template.instance();
  template.currentPage.set(page);
  window.scroll(0, 0);

}

Template.prepareQuery = () => {

  let q = {};
  let u = Meteor.user();

  if(Roles.userIsInRole(u._id, 'normal')) {
    q.createdBy = u._id;
  }

  if(Roles.userIsInRole(u._id, 'operator')) {
    // q.$or = [{ status: 'Pendente' }, { status: 'Faltando dados' }, { status: 'Reprovado' }];
  }

  console.log('query', q);
  return q;

};

Template.home.events({
  'click .goURL' (event, template) {
    event.preventDefault();
    window.location = event.target.getAttribute('href');
  },
  'click .setPage' (event, template) {
    event.preventDefault();
    console.log('set page', event.target.dataset.page);
    Template.setPage(event.target.dataset.page);
  },
  'click .btnhasNewCredit' (event, template) {
    event.preventDefault();
    console.log('click setHasCredit');
    Meteor.call('setHasCredit', {
      credits: false,
      _id: Meteor.user()._id
    }, function(error, result){
      if(result) {
       console.log('hasNewCredit ok', result)
      }
      if(error) {
       console.log('hasNewCredit error', error, result)
      }
    });

  }
});

Template.home.helpers({
  hasCredit() {
    var u = Meteor.user();
    console.log('hasCredit test2', u);
    if(!u || !u.profile || !u.profile.credits) return false;
    if(u && u.profile['credits']) {
      // let g = Namas.findOne({ key: 'main' });
      // if(!g) return false;
      let g = u.profile && u.profile.searchPrice? u.profile.searchPrice: 1;
      console.log('credits', u.profile.credits, g);
      return u.profile.credits >= g;
    }
    console.log('credits', 'return true');
    return true;
  },
  credits() {
    var u = Meteor.user();
    if(!u || !u.profile || !u.profile.credits) {
      return 'Sem créditos';
    }
    return 'R$ ' + u.profile.credits + ' em créditos';
  },
  userCompany(_id) {
    let user = Meteor.users.findOne(_id);
    let comp = Company.findOne(user.profile.company);
    return comp? comp.name: '';
  },
  currentPage() {
    return Template.instance().currentPage.get();
  },
  dataReady() {
    return Template.instance().dataReady.get();
  },
  hasNewCredit()  {
    return Meteor.user().profile.hasNewCredit;
  },
  pages() {

    let template = Template.instance();
    let q = Template.prepareQuery();
    let total = Math.round(Registries.find(q).count() / Template.pageLimit);
    let ret = {
      pages: [],
      current: template.currentPage.get()
    }

    for(let x = 0; x < total; x++) {
      ret.pages.push({
        page: x + 1,
        current: x == (ret.current - 1)
      })
    }

    return ret;

  },
  unRead(registry) {
    if(registry.seen && Array.isArray(registry.seen)) {
      return registry.seen.indexOf(Meteor.user()._id) > -1 ? 'read': 'unread';
    }
    return 'unread';
  },
  registries() {

    if(!Meteor.user()) return [];

    let template = Template.instance();
    let q = Template.prepareQuery();
    let currentPage = template.currentPage.get();

    let page = 0;

    if(currentPage) {
      page = currentPage - 1;
    }

    return Registries.find(q, {
      limit: Template.pageLimit,
      skip: page * Template.pageLimit,
      sort: { updatedAt: -1, createdAt: -1 }
    });

  }
});
