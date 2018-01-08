/**
 * @fileoverview Prevent setting changed attribute of the model in views
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
            description: "Prevent setting changed attribute of the model in views",
            category: "Best Practices",
            recommended: true,
            url: "https://github.com/ilyavolodin/eslint-plugin-backbone/tree/master/docs/rules/no-changed-set.md"
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
                    node.left.object.type === "MemberExpression" &&
                    node.left.object.object.type === "ThisExpression" &&
                    node.left.object.property.name === "model" &&
                    node.left.property.name === "changed") {
                        context.report(node, "Do not assign changed property of the model directly.");
                }
            }
        };
    }
};
