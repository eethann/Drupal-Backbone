Backbone for Drupal
===


What this module does
---

This module provides an extended version of [BackboneJS][backbone] with
convenience functions for working with Drupal nodes and views.  Using this
module, you can build complex interactive interfaces with little to no server
side code, leveraging Drupal's field and entity types and Backbone's power on
the client side.

[backbone]: http://documentcloud.github.com/backbone/


Installation
---

   * Download the latest version of [Underscore.js][underscore] into the
     appropriate libraries/underscore directory (usuall
     sites/all/libraries/underscore).
   * Enable Clean URLs for your site.
   * Download the latest version of [Backbone.js][backbone] into
     libraries/backbone.
   * Enable this module and it's dependencies.
   * Make some awesome user interfaces with Backbone and Drupal!

[underscore]: http://documentcloud.github.com/underscore/


Testing
---

This module uses the jQuery [QUnit][] library for JavaScript testing, via the [QUnit
module][] for Drupal.  Currently CRUD operations are covered by basic tests, and
thee's a bit of fancy footwork to handle testing of asynchronous AJAX callbacks.
See the backbone.test.js file in the tests subdirectory of this module.

[QUnit]: http://docs.jquery.com/QUnit
[QUnit module]: http://drupal.org/project/qunit


What's to come...
---

We have a lot of plans and hopes for this module.  Here's the current docket:

   * Support for Views Services through Backbone collections.
   * Unit tests for views integration.
   * Example module using node listing (promote to front interface?)
   * In-place editing w/ Backbone and Hallo or another HTML5 contenteditable
     editor.


