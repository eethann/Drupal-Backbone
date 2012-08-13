// Create and Save a comment
var myNode = Drupal.Backbone.Models.Node({
    type: "page",
    title: "This is a new comment",
    body: "That's it, really."
});
myNode.save();
