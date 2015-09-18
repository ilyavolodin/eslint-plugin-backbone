function isBackboneBase(node, settings) {
    "use strict";
    var prefixes = settings.Collection.concat(settings.Model, settings.View).map(function(item) {
        return item.prefix;
    });
    return node.type === "CallExpression" &&
        node.callee.type === "MemberExpression" &&
        (
            (node.callee.object.type === "MemberExpression" && prefixes.indexOf(node.callee.object.object.name) > -1) ||
            (node.callee.object.type === "Identifier" && prefixes.indexOf(node.callee.object.name) > -1)
        ) &&
        node.callee.property.name === "extend";
}

function parseSettings(settings) {
    "use strict";
    return settings.map(function(setting) {
        var splitValue = setting.split(".");
        return splitValue.length > 1 ? { prefix: splitValue[0], postfix: splitValue[1] } : { prefix: splitValue[0] };
    });
}

function normalizeSettings(originalSettings) {
    "use strict";
    originalSettings = originalSettings || {};
    
    var settings = {};
    settings.Collection = originalSettings.Collection ? originalSettings.Collection.concat("Backbone.Collection") : ["Backbone.Collection"];
    settings.Collection = parseSettings(settings.Collection);
    settings.Model = originalSettings.Model ? originalSettings.Model.concat("Backbone.Model") : ["Backbone.Model"];
    settings.Model = parseSettings(settings.Model);
    settings.View = originalSettings.View ? originalSettings.View.concat("Backbone.View") : ["Backbone.View"];
    settings.View = parseSettings(settings.View);
    return settings;
}

function checkForBackboneType(settings, object) {
    "use strict";
    return settings.some(function(item) {
        return item.postfix && object.property ? item.postfix === object.property.name : item.prefix === object.name;
    });
}

function isBackboneModel(node, settings) {
    "use strict";
    settings = normalizeSettings(settings);
    return isBackboneBase(node, settings) && checkForBackboneType(settings.Model, node.callee.object);
}

function isBackboneView(node, settings) {
    "use strict";
    settings = normalizeSettings(settings);
    return isBackboneBase(node, settings) && checkForBackboneType(settings.View, node.callee.object);
}

function isBackboneCollection(node, settings) {
    "use strict";
    settings = normalizeSettings(settings);
    return isBackboneBase(node, settings) && checkForBackboneType(settings.Collection, node.callee.object);
}

function isBackboneAny(node, settings) {
    "use strict";
    settings = normalizeSettings(settings);
    return isBackboneBase(node, settings) && node.callee && node.callee.object && (checkForBackboneType(settings.Model, node.callee.object) || checkForBackboneType(settings.View, node.callee.object) || checkForBackboneType(settings.Collection, node.callee.object));
}

exports.isBackboneAny = isBackboneAny;
exports.isBackboneModel = isBackboneModel;
exports.isBackboneView = isBackboneView;
exports.isBackboneCollection = isBackboneCollection;

exports.checkIfPropertyInBackbone = function(node, settings) {
    "use strict";
    var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
    return isBackboneAny(greatgrandparent, settings);
};

exports.checkIfPropertyInBackboneModel = function(node, settings) {
    "use strict";
    var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
    return isBackboneModel(greatgrandparent, settings);
};

exports.checkIfPropertyInBackboneView = function(node, settings) {
    "use strict";
    var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
    return isBackboneView(greatgrandparent, settings);
};

exports.checkIfPropertyInBackboneCollection = function(node, settings) {
    "use strict";
    var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
    return isBackboneCollection(greatgrandparent, settings);
};
