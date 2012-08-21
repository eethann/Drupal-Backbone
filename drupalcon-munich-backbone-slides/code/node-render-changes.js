// Updating a node when it changes
var NodeView = Drupal.Backbone.Views.Base.extend({
  templateSelector: '#template-one-node',
  renderer: 'twig',
  initialize: function(options) {
    this.constructor.__super__.initialize.call(this, options);
    this.model.bind('change', this.render);
  }
});
// Asume that we already have a node ready to go:
var myNodeView = new NodeView({model: myNode});
// Render first:
myNodeView.render();
// And if we change something later, the HTML will update AUTOMATICALLY.
myNode.set('title', 'Magic!');
