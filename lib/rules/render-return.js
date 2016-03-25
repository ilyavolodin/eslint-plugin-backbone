/**
 * @fileoverview Enforces render function to always return this
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
            description: "Enforces render function to always return this",
            category: "Best Practices",
            recommended: true
        },
        schema: []
    },
    create: function(context) {

        var inBackboneRender = null;
        var returnFound = false;

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "FunctionExpression": function(node) {
                if (node.parent.type === "Property" && node.parent.key.type === "Identifier" && node.parent.key.name === "render") {
                    if (helper.checkIfPropertyInBackboneView(node.parent.key)) {
                        inBackboneRender = node;
                        returnFound = false;
                    }
                }
            },
            "FunctionExpression:exit": function(node) {
                if (inBackboneRender !== null && inBackboneRender === node) {
                    inBackboneRender = null;
                    if (!returnFound) {
                        context.report(node, "render method should always return 'this'");
                    }
                }
            },
            "ReturnStatement": function(node) {
                if (inBackboneRender) {
                    returnFound = node.argument && node.argument.type === "ThisExpression";
                }
            }
        };
    }
};
