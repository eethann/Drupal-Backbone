// A Child of Backbone.JS with Drupal Services defaults
//
// TODO Add configurable endpoint path, loaded via Drupal Behaviors
// TODO Add Backbone.Collection Child for Views integration
// TODO Move tests into unit testing library, Jasmine likely

(function($) {
  $(function() {
    // DrupalBackbone Constructor, currently a no-op
    DrupalBackbone = function() {};

    // Extend the Model object with default Drupal Services settings and methods.
    DrupalBackbone.Model = Backbone.Model.extend({
      urlRoot: "/backbone_rest/node",
      idAttribute: "nid", 

      // Use the Drupal Services REST format for nodes, /endpoint/{{nid}}.json.
      // We don't include the collection stuff here, since Drupal collections are
      // indpendent of their objects.
      url: function() {
        // Modified from Backbone.js to ignore collection and add ".format" extension.
        var base = this.urlRoot || urlError();
        if (this.isNew()) { return base; }
        // Add .json for format here.
        return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id) + ".json";
        },

      // Override toJSON function to nest all attributes in a { node: ... } key
      // to make this work with the Services module implementation of node PUSH/PUT.
      toJSON: function() {
        var data = {
          node: _.clone(this.attributes)
        };
        return data;
      }
    });
  });
})(jQuery);

