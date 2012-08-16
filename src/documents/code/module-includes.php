<?php
function backbone_example_admin_page() {
  // Add templates to page.
  backbone_add_template('backbone-example-node-template', theme('backbone_example_node_template'));
  backbone_add_template('backbone-example-app-template', theme('backbone_example_app_template'));
  // Add app js.
  drupal_add_js(drupal_get_path('module', 'backbone_example') . '/js/backbone_example_app.js');
  // ...*snip*...
}
?>
