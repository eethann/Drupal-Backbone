<?php
function backbone_example_admin_page() {
  // ...snip...
  return array(
    '#type' => 'html_tag',
    '#tag' => 'div',
    '#attributes' => array(
      'id' => 'backbone-example-app',
    ),
  );
}
?>