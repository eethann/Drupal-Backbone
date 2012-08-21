// Display a collection

// Create Collection class
var collection = new Drupal.Backbone.Collections.NodeView({
  model: Drupal.Backbone.Models.Node,
  viewName: 'drupalcon_munich_basic_view'
});

// Create Node View
var NodeView = Drupal.Backbone.Views.Base.extend({
  templateSelector: '#backbone_munich_node_template',
  renderer: 'twig',
  tagName: 'li'
});

// Create Collection View
var collectionView = new Drupal.Backbone.Views.CollectionView({
  collection: collection,
  templateSelector: '#backbone_munich_collection_template',
  renderer: 'twig',
  el: '#backbone-munich-collection-render-app',
  ItemView: NodeView,
  itemTag: 'li',
  itemParent: 'ul.search-results'
});

// Render view (shell, items will attach on collection "add" event)
collectionView.render();

// Fetch collection, triggers adding all individual,
// rendered models to our collection! (thanks to event binding)
collection.fetch();

