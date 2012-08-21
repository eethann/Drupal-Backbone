// Create Collection View
var collectionView = new Drupal.Backbone.Views.CollectionView({
  collection: collection,
  templateSelector: '#backbone_munich_collection_template',
  renderer: 'twig',
  el: '#backbone-munich-collection-render-app',
  ItemView: NodeView,
  itemParent: 'ul.search-results'
});

// Render view (shell, items will attach on collection "add" event)
collectionView.render();
// Fetch collection, items automatically rendered into list!
collection.fetch();
