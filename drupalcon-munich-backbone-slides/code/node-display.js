// Create a (Backbone) view for our node (using the Twig.js templating engine)
var NodeView = Drupal.Backbone.Views.Base.extend({
  templateSelector: '#template-one-node',
  renderer: 'twig'
})

// Create a demo node model object to display.
var myNode = new Drupal.Backbone.Models.Node({
  title: 'Example Node'
})

// Create an instance of our node view to render this node.
var myNodeView = new NodeView({model: myNode});

// Run the render function
myNodeView.render();
