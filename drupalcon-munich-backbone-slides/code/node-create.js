// Create our node model object
var myNode = Drupal.Backbone.Models.Node({
    type: "page",
    title: "This is a new comment",
    body: "That's it, really."
});

// Save to send the data to the server
myNode.save();

// After save, we get nid added to the node
// model, and any additional properties.