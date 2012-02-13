// A Child of [Backbone.JS][backbone] with Drupal Services defaults
//
// * TODO Add .TaxonomyCollection with support for taxonomy listings.
// * TODO Add .SearchCollection with support for search results.
// * TODO Add configurable endpoint path, loaded via Drupal Behaviors
//   (will remove hard dependency on backbone_base feature)
// * TODO Add .FieldViewCollection for working with field views.
//
// [backbone]: http://documentcloud.github.com/backbone

(function($) {

  // Attached to page via Drupal behaviors, for reasons
  // of both perperness and so we can use Drupal JS setings.
  Drupal.behaviors.backbone = {
    attach: function() {
      // Drupal.Backbone
      // ---
      //
      // Starts with the Drupal.Backbone Constructor, currently a no-op
      Drupal.Backbone = function() {};

      // Base objects for Drupal Backbone implementation.
      // ---

      // ### Drupal.Backbone.Model
      //
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

      // ### Drupal.Backbone.Collection
      //
      // Currently just sets the endpoint for all collections.
      //
      // TODO fix scoping issue that causes params to bleed between children of this object.
      //  e.g. if you have two NodeViewCollections, setting limit on one sets on both.
      Drupal.Backbone.Collection = Backbone.Collection.extend({
        // Base endpoint, used to create full url for each collection.
        restEndpoint: "/backbone/rest",

        // We bind the param functions to this on initialize, to avoid chain
        // inheritance issues.
        //
        // *NOTE* if you subclass this and have an initialize function in your
        // subclass, you need to execute Drupal.Backbone.Collection.initialize
        // explicitly.
        initialize: function() {
          _.bindAll(this, 'setParam', 'setParams', 'getParams');
          this.params = {};
        },

        // Drupal collections are stateful, we store params in the collection.
        params: {},

        // Setter for individual params, called as setParam('name','value').
        setParam: function(paramName, paramValue) {
          this.params[paramName] = paramValue;
        },

        // Setter for multiple params, passed as object with key/value pairs.
        setParams: function(params) {
          if (typeof(params) === 'Object') {
            _.extend(
              this.params,
              params
            );
          }
        },
        // Getter. Currently just returns param object property.
        getParams: function() {
          return this.params;
        },

        // Fetch method passes params as data in AJAX call.
        fetch: function(options) {
          if (options.data) {
            // Allow options.data to override any params.
            _.defaults(options.data, this.getParams());
          }
          else if (this.getParams()) {
            options.data = this.getParams();
          }
          // Call Super fetch function with options array including any collection params.
          Backbone.Collection.prototype.fetch.call(this, options);
        }
      });

      // ### Drupal.Backbone.View
      //
      // Currently just a no-op, for later use once we get to Backbone views integration.
      Drupal.Backbone.View = Backbone.View.extend({});

      // Drupal.Backbone Models
      // ---
      //
      // Drupal-specific models. Currently just nodes, but terms and files could follow.

      // ### Drupal.Backbone.NodeModel
      //
      // Node-specific settings for Drupal Services' node resource.
      Drupal.Backbone.NodeModel = Drupal.Backbone.Model.extend({
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

      // Drupal Backbone Collections
      // ---
      //
      // Specific collections for Drupal listing types.

      // ### Drupal.Backbone.NodeIndexCollection
      //
      // Create collection for Node resource's index interface.
      Drupal.Backbone.NodeIndexCollection = Drupal.Backbone.Collection.extend({
        model: Drupal.Backbone.NodeModel,
        url: function() {
          return this.restEndpoint + "/node.json";
        }
      });

      // ### Drupal.Backbone.NodeViewCollection
      //
      // Create collection for Views resource's index interface.
      // Note that this is just for views that use the "Content" display
      // for their nodes.  Field views will need to be handled differently.
      //
      // May be worth considering if field views are really appropriate
      // for backbone, since it deals with collections of model objects,
      // and field views do not fit that mode.
      //
      // TODO require view name at initialization or fetch.
      // TODO create basic view collection, subclass node and field views.
      Drupal.Backbone.NodeViewCollection = Drupal.Backbone.Collection.extend({
        model: Drupal.Backbone.NodeModel,
        // Name of Drupal view for this collection.
        viewName: null,
        url: function() {
          return this.restEndpoint + "/views/" + this.viewName + ".json";
        }
      });
    }
  };

})(jQuery);

