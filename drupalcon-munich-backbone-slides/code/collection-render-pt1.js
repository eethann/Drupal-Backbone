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

