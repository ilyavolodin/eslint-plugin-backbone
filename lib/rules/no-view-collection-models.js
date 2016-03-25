/**
 * @fileoverview Prevent access to collection's models property inside views
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
            description: "Prevent access to collection's models property inside views",
            category: "Best Practices",
            recommended: true
        },
        schema: []
    },
    create: function(context) {

        var backboneView = [];
        var settings = context.settings || /* istanbul ignore next */ {};

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function(node) {
                backboneView.push(backboneView[backboneView.length - 1] || helper.isBackboneView(node, settings.backbone));
            },
            "CallExpression:exit": function(node) {
                if (helper.isBackboneView(node, settings.backbone)) {
                    backboneView.pop();
                }
            },
            "MemberExpression": function(node) {
                if (backboneView[backboneView.length - 1] &&
                    node.object.type === "MemberExpression" &&
                    node.object.object.type === "ThisExpression" &&
                    (node.object.property.name === "model" || node.object.property.name === "collection") &&
                    node.property.name === "models") {
                        context.report(node, "Do not access models directly. Use get() and at() methods instead.");
                    }
            }
        };
    }
};
