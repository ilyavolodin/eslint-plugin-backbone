/**
 * @fileoverview require all models to have defaults section
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../../backbone-helper.js");

module.exports = function(context) {

    var backboneModel = [];
    var foundDefaults = false;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            backboneModel.push(backboneModel[backboneModel.length - 1] || helper.isBackboneModel(node));
            if (backboneModel[backboneModel.length - 1]) {
                foundDefaults = false;
            }
        },
        "CallExpression:exit": function(node) {
            if (helper.isBackboneModel(node)) {
                if (!foundDefaults) {
                    context.report(node, "All models should have defaults declared");
                }
                backboneModel.pop();
            }
        },
        "Identifier": function(node) {
            if (backboneModel[backboneModel.length - 1] && node.name === "defaults") {
                if (helper.checkIfPropertyInBackboneModel(node)) {
                    foundDefaults = true;
                }
            }
        }
    };
};
