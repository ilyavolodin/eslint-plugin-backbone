function isBackboneBase(node) {
	"use strict";
	return node.type === "CallExpression" && node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.name === "Backbone" && node.callee.property.name === "extend";
}

function isBackboneModel(node) {
	"use strict";
	return isBackboneBase(node) && node.callee.object.property.name === "Model";
}

function isBackboneView(node) {
	"use strict";
	return isBackboneBase(node) && node.callee.object.property.name === "View";
}

function isBackboneCollection(node) {
	"use strict";
	return isBackboneBase(node) && node.callee.object.property.name === "Collection";
}

function isBackboneAny(node) {
	"use strict";
	return isBackboneBase(node) && (node.callee.object.property.name === "Collection" || node.callee.object.property.name === "View" || node.callee.object.property.name === "Model");
}

exports.isBackboneAny = isBackboneAny;
exports.isBackboneModel = isBackboneModel;
exports.isBackboneView = isBackboneView;
exports.isBackboneCollection = isBackboneCollection;

exports.checkIfPropertyInBackbone = function(node) {
	var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
	return isBackboneAny(greatgrandparent);
};

exports.checkIfPropertyInBackboneModel = function(node) {
	var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
	return isBackboneModel(greatgrandparent);	
};

exports.checkIfPropertyInBackboneView = function(node) {
	var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
	return isBackboneView(greatgrandparent);	
};

exports.checkIfPropertyInBackboneCollection = function(node) {
	var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
	return isBackboneCollection(greatgrandparent);
};
