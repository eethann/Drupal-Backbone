// Updating a node when it changes
var NodeView = Drupal.Backbone.Views.Base.extend({
    templateSelector: '#template-one-node',
    initialize: function(options) {
        this.model.bind('change', this.render);
    }
});
var myNodeView = new NodeView({model: myNode});
myNodeView.render();

// Now we change something: 
myNode.set('title', 'Magic!');
