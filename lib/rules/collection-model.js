/**
 * @fileoverview Require all collections to declare model
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../../backbone-helper.js");

module.exports = function(context) {

    var backboneCollection = false;
    var foundModel = false;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            backboneCollection = backboneCollection || helper.isBackboneCollection(node);
            if (backboneCollection) {
                foundModel = false;
            }
        },
        "CallExpression:exit": function(node) {
            if (helper.isBackboneCollection(node)) {
                if (!foundModel) {
                    context.report(node, "All collections should have model declared");
                }
                backboneCollection = false;
            }
        },
        "Identifier": function(node) {
            if (backboneCollection && node.name === "model") {
                foundModel = true;
            }
        }
    };
};
