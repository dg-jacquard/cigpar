
FlowRouter.route('/', {
  name: "home",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "newRegistry",
      nav: "nav",
    });
  }
});
FlowRouter.route('/new-registry', {
  name: "home",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "newRegistry",
      nav: "nav",
    });
  }
});

FlowRouter.route('/history', {
  name: "newRegistry",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "home",
      nav: "nav",
    });
  }
});

FlowRouter.route('/credits', {
  name: "credits",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "credits",
      nav: "nav",
    });
  }
});

FlowRouter.route('/details/:id', {
  name: "details",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "details",
      nav: "nav",
    });
  }
});

FlowRouter.route('/admin', {
  name: "admin",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "admin",
      nav: "nav",
    });
  }
});

FlowRouter.route('/admin/plans', {
  name: "adminPlans",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "adminPlans",
      nav: "nav",
    });
  }
});

FlowRouter.route('/admin/users', {
  name: "adminUsers",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "adminUsers",
      nav: "nav",
    });
  }
});

FlowRouter.route('/logout', {
  name: 'logout',
  // triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    Accounts.logout();
    BlazeLayout.render('logoutLayout', {
      // footer: "footer",
      // main: "private",
      // nav: "nav",
    });
    // window.location = '/sign-in';
    // FlowRouter.redirect('/sign-in');
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};

AccountsTemplates.configureRoute('ensureSignedIn', {
    template: 'loginLayout', //template shown if user is not signed in
    layoutTemplate: 'atLayout' //template for login, registration, etc
});

//Don't require user to be logged in for these routes
// FlowRouter.plugin('ensureSignedIn', {
//     except: ['login', 'register']
// });

//Configure route for login
// AccountsTemplates.configureRoute('signIn', {
//     name: 'login',
//     path: '/login',
//     template: 'atTemplate',
//     layoutTemplate: 'atLayout',
//     redirect: '/'
// });
//
// //Configure route for registration
// AccountsTemplates.configureRoute('signUp', {
//     name: 'register',
//     path: '/register',
//     template: 'atTemplate',
//     layoutTemplate: 'atLayout',
//     redirect: '/'
// });

AccountsTemplates.configure({
    // defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    defaultTemplate: 'atTemplate',
    defaultLayout: 'atLayout',
    // defaultLayoutRegions: {
    //     nav: 'myNav',
    //     footer: 'myFooter'
    // },
    // defaultContentRegion: 'main'
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
