(function($) {
  /**
   * Test the DrupalBackbone library.
   */
  Drupal.tests.backbone = {
    getInfo: function() {
      return {
        name: 'Backbone',
        description: 'Tests the DrupalBackbone library for node loading, etc.',
        group: 'Backbone'
      };
    },
    test: function() {
      // Expect assertions contained in async calls.
      expect(3);

      // Stop the test runner, we will restart when all of our async tests have completed.
      // TODO: Look into adding an asyncTest interface for Drupal QUnit.
      stop();

      // Test baseic node CRUD.
      // Create a jQuery queue to make nested asyn easier. (Otherwise these
      // would need to be nested within eachother).
      // TODO: Look into $.deffered for handling this more robustly.
      var crudQueue = $({});
      var newNid = null;
      
      // A factory function that uses closures to produce success and error callbacks 
      // for our Ajaj tests.
      var dequeueFuncs = function(stageName) {
        return {
          success: function() {
            ok(true, Drupal.t('Drupal Backbone CRUD REST Call ' + stageName));
            crudQueue.dequeue('crudQueue');
          }, 
          error: function() {
            ok(false, Drupal.t('Drupal Backbone CRUD REST Call' + stageName));
            // After erroring out, don't continue with tests.
            // TODO: determine how to clean up if we've created but not destroyed our test node.
            crudQueue.clearQueue('crudQueue');
            // Restart QUnit tests, continue on to next test.
            start();
          }
        };
      };

      // Create a node object to use in our testing.
      newNode = new Drupal.Backbone.NodeModel({
        'title': 'Backbone Test Node',
        'type': 'page'
      });

      // We use a queue to manage asynchronous processes, so each stage in the
      // CRUD runs after the prior callback has completed.
      // TODO Load that node and confirm create worked.
      crudQueue.queue('crudQueue', function() {
        newNode.save( {}, dequeueFuncs('Create'));
      });

      // Update that node.
      // TODO Load node and test the update actually worked.
      crudQueue.queue('crudQueue', function() {
        newNid = newNode.get('nid');
        console.dir(newNid);
        newNode.set('title', 'Updated Title');
        newNode.save( {}, dequeueFuncs('Update'));
      });

      // Delete that node.
      // TODO Attempt to load node again (should fail)
      crudQueue.queue('crudQueue', function() {
        newNode.destroy(dequeueFuncs('Destroy'));
      });

      // Last queue item: wrap up this test.
      crudQueue.queue('crudQueue', function() {
        start();
      });

      // Run the queued operaitons: Go!
      crudQueue.dequeue('crudQueue');
    }
  };

})(jQuery);
