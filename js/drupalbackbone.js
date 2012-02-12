// A Child of Backbone.JS with Drupal Services defaults
//
// TODO Move tests into unit testing library, Jasmine likely
// TODO Add configurable endpoint path, loaded via Drupal Behaviors
//   (will remove hard dependency on backbone_base feature)
// TODO Add .NodeIndexCollection for node index Services resource.
// TODO Add .ViewsCollection Child for Views integration
// TODO Add .TaxonomyCollection with support for taxonomy listings.
// TODO Add .SearchCollection with support for search results.

(function($) {

  $(function() {
    // Drupal.Backbone Constructor, currently a no-op
    Drupal.Backbone = function() {};

    // Extend the Model object with default Drupal Services settings and methods.
    // These are defaults for interfacing with all Service module's providers.
    Drupal.Backbone.Model = Backbone.Model.extend({
      // Use the Drupal Services REST format for nodes, /endpoint/{{nid}}.json.
      // We don't include the collection stuff here, since Drupal collections are
      // indpendent of their objects.
      url: function() {
        // Modified from Backbone.js to ignore collection and add ".format" extension.
        var base = this.urlRoot || urlError();
        if (this.isNew()) { return base; }
        // Add .json for format here.
        return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id) + ".json";
        }
    });

    // Node-specific settings for Drupal Services' node resource.
    Drupal.Backbone.Node = Drupal.Backbone.Model.extend({
      urlRoot: "/backbone/rest/node",
      idAttribute: "nid", 

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

