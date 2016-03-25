/**
 * @fileoverview Prevent using on/off bindings inside views
 * @author Ilya Volodin
 * @copyright 2015 Ilya Volodin. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../backbone-helper.js");

module.exports = {
    meta: {
        docs: {
            description: "Prevent using on/off bindings inside views",
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
                    (node.object.property.name === "model" || node.object.property.name === "collection")) {
                    if (node.property.name === "on") {
                        context.report(node, "Use listenTo instead of 'on'.");
                    } else if (node.property.name === "off") {
                        context.report(node, "Use stopListening instead of 'off'.");
                    }
                }
            }
        };
    }
};
