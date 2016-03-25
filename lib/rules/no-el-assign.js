/**
 * @fileoverview Prevent assigning el or $el inside views
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
            description: "Prevent assigning el or $el inside views",
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
            "AssignmentExpression": function(node) {
                if (backboneView[backboneView.length - 1] &&
                    node.left.type === "MemberExpression" &&
                    node.left.object.type === "ThisExpression" &&
                    (node.left.property.name === "el" || node.left.property.name === "$el")) {
                        context.report(node, "Do not assign '{{identifier}}' directly. Use setElement() instead", { identifier: node.left.property.name });
                }
            }
        };
    }
};
