/**
 * @fileoverview require all models to have defaults section
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
            description: "Require all models to have defaults section",
            category: "Best Practices",
            recommended: true
        },
        schema: []
    },
    create: function(context) {

        var backboneModel = [];
        var settings = context.settings || /* istanbul ignore next */ {};

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function(node) {
                if (helper.isBackboneModel(node, settings.backbone)) {
                    backboneModel.push({ node: node, found: false });
                }
            },
            "CallExpression:exit": function(node) {
                var lastModel = backboneModel[backboneModel.length - 1];
                if (backboneModel.length > 0 && lastModel.node === node) {
                    if (!lastModel.found) {
                        context.report(node, "All models should have defaults declared");
                    }
                    backboneModel.pop();
                }
            },
            "Identifier": function(node) {
                if (backboneModel.length > 0 && node.name === "defaults") {
                    if (helper.checkIfPropertyInBackboneModel(node, settings.backbone)) {
                        backboneModel[backboneModel.length - 1].found = true;
                    }
                }
            }
        };
    }
};
