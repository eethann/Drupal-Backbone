// Load a collection for a (Drupal) view:
var myViewCollection = Drupal.Backbone.Collections.NodeView({
    model: Drupal.Backbone.Models.Node,
    viewName: "drupalcon_munich_example_view"
});
// Fetch all nodes in the view from the server
mySearchResults.fetch();

// Then, we can run code like this:
mySearchResults.at(0)
mySearchResults.at(0).set('title', "I was in a collection!");
mySearchResults.save();
