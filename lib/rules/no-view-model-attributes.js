/**
 * @fileoverview Prevent access to model's attributes collection inside views
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
            description: "Prevent access to model's attributes collection inside views",
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
                    node.object.property.name === "model" &&
                    node.property.name === "attributes") {
                        context.report(node, "Do not access attributes directly. Use set() and get() instead");
                    }
            }
        };
    }
};
