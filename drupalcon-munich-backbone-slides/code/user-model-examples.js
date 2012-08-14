// Create a user
var myUser = new Drupal.Backbone.Models.User({
    name: "Backbone User",
    pass: "MyPass", // This goes away as soon as we save.
    mail: "user@backbonejs.org"
});
// Save a user
myUser.save();
// Load a user
var serverUser = (new Drupal.Backbone.Models.User({uid:1})).fetch();
// We can log in too!
serverUser.login("password") // TODO: implement logging in
serverUser.logout();
