// Set up login services
// const soap = Npm.require('soap');

const API_URL = 'http://app.leadsmarket.com.br:5002';

Meteor.methods({
  registrarSolicitacao: function(data) {

    console.log('reg method int', data);
    data.cep = data.cep.replace(/[^0-9]/g, '');
    data.cpf = data.cpf.replace(/[^0-9]/g, '');

    console.log('registrarSolicitacao', JSON.stringify(data, null, 4));

    console.log('http post', API_URL + '/register');

    Meteor.http.post( API_URL + '/register', { params: data, data: data },function(err, result) {
      console.log('post', err, result);
    });

    // Meteor.http.post(API_URL + '/register', { data: data }, );

    return 'ok';

  },
  register: function(data) {
   try {
     console.log("Register User");
     console.log(data);
     user = Accounts.createUser({
       username: data.email,
       email: data.email,
       password: data.password,
       profile: {
         name: data.name,
         createdOn: new Date(),
         IsInternal: 0,
         company: data.company || '',
         credits: Math.floor(data.credits || 0),
         criminal: Math.floor(data.criminal || 0),
         financeira: Math.floor(data.financeira || 0),
         completa: Math.floor(data.completa || 0),
         searchPrice: Math.floor(data.searchPrice || 1)
       }
     });

     Meteor.users.update({
       _id: user
     }, {
       $set: {
         roles: [ data.role || 'normal' ]
       }
     });

     return {
       "userId": user
     };
   } catch (e) {
     // IF ALREADY EXSIST THROW EXPECTION 403
     throw e;
   }
 },
  setHasCredit: function(data) {
    Meteor.users.update({
      _id: data._id
    }, {
      $set: {
        'profile.hasNewCredit': data.credits
      }
    });
  },
  update: function(data) {

     let $set = {};

     if(data.name) $set['profile.name'] = data.name;
     if(data.credits) $set['profile.credits'] = Math.floor(data.credits || 0);
     if(data.criminal) $set['profile.criminal'] = Math.floor(data.criminal || 0);
     if(data.financeira) $set['profile.financeira'] = Math.floor(data.financeira || 0);
     if(data.completa) $set['profile.completa'] = Math.floor(data.completa || 0);
     if(data.name) $set['profile.name'] = data.name;
     if(data.company) $set['profile.company'] = data.company;
     if(data.searchPrice) $set['profile.searchPrice'] = data.searchPrice;
     if(data.role) $set['roles'] = [data.role];
     if(data.email) $set['emails'] = [{
        "address" : data.email,
        "verified" : false
     }];

     console.log('update user', $set);

     Meteor.users.update({
       _id: data._id
     }, {
       $set: $set
     });

     if(data.password) {
      Accounts.setPassword(data._id, data.password, {logout: false});
     }
   }

});

Meteor.startup(function() {
  // Add Facebook configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: "XXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add GitHub configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "github" },
    { $set: {
        clientId: "XXXXXXXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add Google configuration entry
  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        client_email: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );

  // Add Linkedin configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "linkedin" },
    { $set: {
        clientId: "XXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */
});
