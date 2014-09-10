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

    var backboneModel = false;
    var foundDefaults = false;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            backboneModel = helper.isBackboneModel(node);
            if (backboneModel) {
                foundDefaults = false;
            }
        },
        "CallExpression:exit": function(node) {
            if (helper.isBackboneModel(node)) {
                if (!foundDefaults) {
                    context.report(node, "All models should have defaults declared");
                }
                backboneModel = false;
            }
        },
        "Identifier": function(node) {
            if (backboneModel && node.name === "defaults") {
                foundDefaults = true;
            }
        }
    };

};
