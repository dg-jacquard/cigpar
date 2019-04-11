Template.logoutLayout.onCreated(function () {
  window.setTimeout(function() {
    window.location = '/sign-in';
  }, 1000);
});
