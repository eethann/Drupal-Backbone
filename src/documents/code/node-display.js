// Display a node
// TODO: include template
var NodeView = Drupal.Backbone.Views.Base.extend({
    templateSelector: '#template-one-node'
})
var myNodeView = new NodeView({model: myNode});
myNodeView.render();
