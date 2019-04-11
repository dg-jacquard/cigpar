Meteor.startup(function() {

  console.log('Meteor.startup()', true);

  console.log("Files:", ClientDocs.find().count());

  ClientDocs.on('removed', function (fileObj) {
    console.log("Removed " + fileObj._id + " from Images collection.");
  });

  WebApp.connectHandlers.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, x-request-metadata');
    res.setHeader('Access-Control-Allow-Credentials', "true");

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });

});
