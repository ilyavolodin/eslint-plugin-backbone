/**
 * @typedef CustomSetting
 * @property {Array<object>} Collection - the collection type setting
 * @property {Array<object>} Model - the model type setting
 * @property {Array<object>} View - the view type setting
 */

/** @typedef { import('estree').default } ESTree */

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether the node is based in backbone
 */
function isBackboneBase(node, settings) {
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

/**
 *
 * @param {Array<string>} settings - the base settings coming from ESLint configuration
 * @returns {Array<CustomSetting>} the parsed custom setting
 */
function parseSettings(settings) {
    return settings.map(function(setting) {
        var splitValue = setting.split(".");
        return splitValue.length > 1 ? { prefix: splitValue[0], postfix: splitValue[1] } : { prefix: splitValue[0] };
    });
}

/**
 *
 * @param {object} originalSettings - the base settings coming from ESLint configuration
 * @returns {CustomSetting} the parsed custom setting
 */
function normalizeSettings(originalSettings) {
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

/**
 *
 * @param {Array<object>} settings - the settings for one of the backbone types
 * @param {object} object - something that might have this backbone type
 * @returns {boolean} whether the object matches the provided type
 */
function checkForBackboneType(settings, object) {
    return settings.some(function(item) {
        return item.postfix && object.property ? item.postfix === object.property.name : item.prefix === object.name;
    });
}

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether is a backbone model
 */
function isBackboneModel(node, settings) {
    settings = normalizeSettings(settings);
    return isBackboneBase(node, settings) && checkForBackboneType(settings.Model, node.callee.object);
}

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether is a backbone view
 */
function isBackboneView(node, settings) {
    settings = normalizeSettings(settings);
    return isBackboneBase(node, settings) && checkForBackboneType(settings.View, node.callee.object);
}

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether is a backbone collection
 */
function isBackboneCollection(node, settings) {
    settings = normalizeSettings(settings);
    return isBackboneBase(node, settings) && checkForBackboneType(settings.Collection, node.callee.object);
}

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether is a backbone type of any kind
 */
function isBackboneAny(node, settings) {
    settings = normalizeSettings(settings);
    return isBackboneBase(node, settings) && node.callee && node.callee.object && (checkForBackboneType(settings.Model, node.callee.object) || checkForBackboneType(settings.View, node.callee.object) || checkForBackboneType(settings.Collection, node.callee.object));
}

exports.isBackboneAny = isBackboneAny;
exports.isBackboneModel = isBackboneModel;
exports.isBackboneView = isBackboneView;
exports.isBackboneCollection = isBackboneCollection;

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether the property's value is a backbone type of any kind
 */
exports.checkIfPropertyInBackbone = function(node, settings) {
    var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
    return isBackboneAny(greatgrandparent, settings);
};

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether the property's value is a backbone model
 */
exports.checkIfPropertyInBackboneModel = function(node, settings) {
    var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
    return isBackboneModel(greatgrandparent, settings);
};

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether the property's value is a backbone view
 */
exports.checkIfPropertyInBackboneView = function(node, settings) {
    var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
    return isBackboneView(greatgrandparent, settings);
};

/**
 *
 * @param {ESTree.Node} node - the node being checked
 * @param {CustomSetting} settings - the settings
 * @returns {boolean} whether the property's value is a backbone collection
 */
exports.checkIfPropertyInBackboneCollection = function(node, settings) {
    var parent = node.parent, grandparent = parent.parent, greatgrandparent = grandparent.parent;
    return isBackboneCollection(greatgrandparent, settings);
};
