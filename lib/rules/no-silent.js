/**
 * @fileoverview Prevent using silent option in functions that cause events
 * @author Ilya Volodin
 * @copyright 2014 Ilya Volodin. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../backbone-helper.js");

module.exports = {
    meta: {
        docs: {
            description: "Prevent using silent option in functions that cause events",
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
                var functions = ["set", "unset", "reset", "clear", "remove", "add", "push", "unshift", "shift", "sort", "create"];
                var ancestors = context.getAncestors(node);
                var parent = ancestors.pop();
                if (backbone[backbone.length - 1] && (node.name === "silent") && parent.type === "Property" && parent.value.type === "Literal" && parent.value.value === true) {
                    parent = ancestors[ancestors.length - 2];
                    if (parent && parent.type === "CallExpression" && parent.callee.type === "MemberExpression" && parent.callee.property.type === "Identifier" && functions.indexOf(parent.callee.property.name) > -1) {
                        context.report(node, "Do not silence events.");
                    }
                }
            }
        };
    }
};
