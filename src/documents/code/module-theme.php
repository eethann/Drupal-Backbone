<?php
function backbone_example_theme($existing, $type, $theme, $path) {
  return array(
    'backbone_example_node_template' => array(
      'variables' => array(),
    ),
    'backbone_example_app_template' => array(
      'template' => 'backbone-example-app-template',
      'variables' => array(),
    ),
  );
}
?>