<?php
function backbone_example_admin_page() {
  // Include libs
  drupal_add_library('backbone', 'drupalbackbone-services');
  drupal_add_library('backbone', 'twig.js');
  // Add templates to page.
  backbone_add_template('backbone_munich_node_event_bind_template', theme('backbone_munich_node_event_bind_template'));
  // Add app js.
  drupal_add_js(drupal_get_path('module', 'backbone_munich') . '/js/collection_event_bind.js');
  // ...*snip*...
}
?>
