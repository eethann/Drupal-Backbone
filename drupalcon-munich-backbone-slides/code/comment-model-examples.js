// Create a comment
var myComment = new Drupal.Backbone.Models.Comment({
  nid: 1,
  subject: "It's easier with Backbone.js",
  body: "And it's more fun, too."
});
// Save a comment
myComment.save();
// Load a comment
var serverComment = (new Drupal.Backbone.Models.Comment({cid:1})).fetch();
// (yay chainable methods!)

