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
      expect(8);

      // Stop the test runner, we will restart when all of our async tests have completed.
      // TODO: Look into adding an asyncTest interface for Drupal QUnit.
      stop();

      // Test baseic node CRUD.
      // Create a jQuery queue to make nested asyn easier. (Otherwise these
      // would need to be nested within eachother).
      // TODO: Look into $.deffered for handling this more robustly.
      var asyncQueue = $({});
      var newNid = null;
      
      // A factory function that uses closures to produce success and error callbacks 
      // for our Ajaj tests.
      var dequeueFuncs = function(msg) {
        return {
          success: function() {
            ok(true, Drupal.t(msg));
            asyncQueue.dequeue('asyncQueue');
          }, 
          error: function() {
            ok(false, Drupal.t(msg));
            // After erroring out, don't continue with tests.
            // TODO: determine how to clean up if we've created but not destroyed our test node.
            asyncQueue.clearQueue('asyncQueue');
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
      asyncQueue.queue('asyncQueue', function() {
        newNode.save( {}, dequeueFuncs('Drupal CRUD REST call: Create'));
      });

      // Update that node.
      // TODO Load node and test the update actually worked.
      asyncQueue.queue('asyncQueue', function() {
        newNid = newNode.get('nid');
        newNode.set('title', 'Updated Title');
        newNode.save( {}, dequeueFuncs('Drupal CRUD REST call: Update'));
      });

      // Test Node Index, since we have a node created.
      var indexCollection = new Drupal.Backbone.NodeIndexCollection();
      asyncQueue.queue('asyncQueue', function() {
        indexCollection.fetch(_.extend(dequeueFuncs('Fetch Node Index collection'), {data: {pagesize: 1}}));
      });

      // Test returned collection.
      // TODO test offset/page number.
      asyncQueue.queue('asyncQueue', function() {
        equals(indexCollection.length, 1, Drupal.t('Node Index fetch returned one node.'));
        equals(indexCollection.at(0).get('title'), 'Updated Title', Drupal.t('Top node in Node Index is correct one.'));
        asyncQueue.dequeue('asyncQueue'); 
      });
 
      // Test pagesize=0, should always be empty.
      asyncQueue.queue('asyncQueue', function() {
        indexCollection.fetch(_.extend(dequeueFuncs('Fetch Node Index collection'), {data: {pagesize: 0}}));
      });
      asyncQueue.queue('asyncQueue', function() {
        equals(indexCollection.length, 0, Drupal.t('Node Index page size setting worked correctly, no nodes returned.'));
        asyncQueue.dequeue('asyncQueue'); 
      });
 
      // Delete that node.
      // TODO Attempt to load node again (should fail)
      asyncQueue.queue('asyncQueue', function() {
        newNode.destroy(dequeueFuncs('Drupal CRUD REST call: Destroy'));
      });

      // Last queue item: wrap up this test.
      asyncQueue.queue('asyncQueue', function() {
        start();
      });

      // Run the queued operaitons: Go!
      asyncQueue.dequeue('asyncQueue');
    }
  };

})(jQuery);
