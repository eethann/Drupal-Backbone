// Changing a node example
var NodeView = Drupal.Backbone.Views.Base.extend({
    events: {
        'click .promote-toggle': promoteToggle
    },
    initialize: function(options) {
        _(this).bindAll('promoteToggle');
        this.model.bind('change', 'render');
    },
    promoteToggle: function(e) {
    // BAAAAAD: this should use a method on this.model
        this.model.set('promoted', !this.model.get('promoted'));
        this.model.save();
    }
});
