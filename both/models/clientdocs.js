var ClientDocsStore = new FS.Store.GridFS("clientdocs");

ClientDocs = new FS.Collection("clientdocs", {
  stores: [ClientDocsStore],
  chunkSize: 4 * 1024 * 1024
});

ClientDocs.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc, fields, modifier) {
    return true;
  },
  remove(userId, doc) {
    return true;
  },
  download() {
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish("clientdocs", function() {
    return ClientDocs.find();
  });
}

FS.debug = true; // enable CFS debug logging

// default GET request headers
FS.HTTP.setHeadersForGet([
  ['Cache-Control', 'public, max-age=31536000']
]);

// GET request headers for the "any" store
FS.HTTP.setHeadersForGet([
  ['foo', 'bar']
], 'clientdocs');
