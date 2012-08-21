(function ($){
  Drupal.behaviors.backbone_munich = {
    attach: function() {
       // Load a node
      var myNode = new Drupal.Backbone.Models.Node({
    nid: 1
      });
    }
  };
})(jQuery);
