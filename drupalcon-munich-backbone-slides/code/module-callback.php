<?php
function backbone_example_menu() {
  $items['backbone_example'] = array(
    'title' => 'Backbone Example',
    'page callback' => 'backbone_example_admin_page',
    // ...snip...
  );
  return $items;
}
?>