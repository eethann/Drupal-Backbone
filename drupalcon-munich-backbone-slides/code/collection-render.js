// Display a collection
// TODO: make collection view base for Drupal Backbone
var SearchResultsView = Drupal.Backbone.Views.Collection.extend({
    modelView: NodeView,
    templateSelector: "#template-search-results-collection"
});
var mySearchResultsView = SearchResultsView({
    collection: mySearchResults
});
mySearchResultsView.render();
mySearchResults.get(2).set('title', 'Super Magic!!');

