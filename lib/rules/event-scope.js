/**
 * @fileoverview Verify that scope is passed into event handlers
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../backbone-helper.js");

module.exports = {
    meta: {
        docs: {
            description: "Verify that scope is passed into event handlers",
            category: "Best Practices",
            recommended: false
        },
        schema: []
    },
    create: function(context) {

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
                    !((parent.object.type === "CallExpression" && ((parent.object.callee.type === "Identifier" && parent.object.callee.name === "$") || //covers the case of $().on()
                        (parent.object.callee.type === "MemberExpression" && parent.object.callee.object.type === "ThisExpression" && parent.object.callee.property.name === "$")) || //covers the case of this.$().on()
                    (parent.object.type === "MemberExpression" && parent.object.property.type === "Identifier" && parent.object.property.name === "$el")))) { //covers the case of this.$el.on()
                    while (parent.type !== "CallExpression" && !parent.arguments) {
                        parent = ancestors.pop();
                    }
                    if (parent.arguments.length === 1 && parent.arguments[0].type === 'ObjectExpression') {
                        context.report(node, "Pass scope as second argument.");
                    } else if (parent.arguments.length < 3 && (parent.arguments[0] || {}).type !== 'ObjectExpression') {
                        context.report(node, "Pass scope as third argument.");
                    }
                }
            }
        };
    }
};

