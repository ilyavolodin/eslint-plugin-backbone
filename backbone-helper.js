exports.isBackboneModel = function(node) {
	return node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.name === "Backbone" && node.callee.object.property.name === "Model";
};

exports.isBackboneView = function(node) {
	return node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.name === "Backbone" && node.callee.object.property.name === "View";
};

exports.isBackboneCollection = function(node) {
	return node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.name === "Backbone" && node.callee.object.property.name === "Collection";
};