/**
 * @fileoverview Require all collections to declare model
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
            description: "Require all collections to declare model",
            category: "Best Practices",
            recommended: true
        },
        schema: []
    },
    create: function(context) {
        var settings = context.settings || /* istanbul ignore next */ {};
        var backboneCollection = [];

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function(node) {
                if (helper.isBackboneCollection(node, settings.backbone)) {
                    backboneCollection.push({ node: node, found: false });
                }
            },
            "CallExpression:exit": function(node) {
                var lastCollection = backboneCollection[backboneCollection.length - 1];
                if (backboneCollection.length > 0 && lastCollection.node === node) {
                    if (!lastCollection.found) {
                        context.report(node, "All collections should have model declared");
                    }
                    backboneCollection.pop();
                }
            },
            "Identifier": function(node) {
                if (backboneCollection.length > 0 && node.name === "model") {
                    if (helper.checkIfPropertyInBackboneCollection(node, settings.backbone)) {
                        backboneCollection[backboneCollection.length - 1].found = true;
                    }
                }
            }
        };
    }
};
