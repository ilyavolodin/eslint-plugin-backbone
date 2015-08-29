/**
 * @fileoverview Prevent access to models property of collections
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../backbone-helper.js");

module.exports = function(context) {

    var backboneCollection = [];
    var settings = context.settings || /* istanbul ignore next */ {};

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            backboneCollection.push(backboneCollection[backboneCollection.length - 1] || helper.isBackboneCollection(node, settings.backbone));
        },
        "CallExpression:exit": function(node) {
            if (helper.isBackboneCollection(node, settings.backbone)) {
                backboneCollection.pop();
            }
        },
        "MemberExpression": function(node) {
            if (backboneCollection[backboneCollection.length - 1] &&
                node.object.type === "ThisExpression" &&
                node.property.name === "models") {
                    context.report(node, "Do not access models directly. Use get() and at() instead");
                }
        }
    };
};

module.exports.schema = [];
