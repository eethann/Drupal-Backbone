// Create and Save a comment
var myComment = Drupal.Backbone.Models.Comment({
    uid: 1,
    nid: 1,
    title: "This is a new comment",
    body: "That's it, really."
});
myComment.save();
