/**
 * @fileoverview Verify that scope is passed into event handlers
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../backbone-helper.js");

module.exports = function(context) {

    var settings = context.settings || /* istanbul ignore next */ {};
    var backbone = [];

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            backbone.push(backbone[backbone.length - 1] || helper.isBackboneAny(node, settings.backbone));
        },
        "CallExpression:exit": function(node) {
            if (helper.isBackboneAny(node, settings.backbone)) {
                backbone.pop();
            }
        },
        "Identifier": function(node) {
            var ancestors = context.getAncestors(node);
            var parent = ancestors.pop();
            if (backbone[backbone.length - 1] && (node.name === "on" || node.name === "once") &&
                !((parent.object.type === "CallExpression" && parent.object.callee.type === "Identifier" && parent.object.callee.name === "$") ||
                 (parent.object.type === "MemberExpression" && parent.object.property.type === "Identifier" && parent.object.property.name === "$el"))) {
                while (parent.type !== "CallExpression" && !parent.arguments) {
                    parent = ancestors.pop();
                }
                if (parent.arguments.length < 3) {
                    context.report(node, "Pass scope as third argument.");
                }
            }
        }
    };

};
