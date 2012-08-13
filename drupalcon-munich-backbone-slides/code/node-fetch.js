// Load a  node
var oneNode = Drupal.Backbone.Models.Node({nid: 1});
myNode.fetch();
console.log(oneNode.get('title'));
oneNode.set('title', 'New Title!');
console.dir(oneNode);
