// Load a collection
var mySearchResults = Drupal.Backbone.Collections.Search({
    model: Drupal.Backbone.Models.Node,
    q: "Test"
});
mySearchResults.fetch();
mySearchResults.get(1).set('title', "I was in a collection!");
mySearchResults.save();

