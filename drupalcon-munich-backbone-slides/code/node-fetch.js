// Load a  node
var oneNode = Drupal.Backbone.Models.Node({nid: 1});
myNode.fetch();

// Then we can run things like:
console.log(oneNode.get('title'));
oneNode.set('title', 'New Title!');
console.dir(oneNode.attributes);
// -> { nid: 1, promoted: 1, title: "title", etc. }
