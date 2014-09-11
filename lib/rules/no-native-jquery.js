/**
 * @fileoverview Prevent usage of $ in the views
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../../backbone-helper.js");

module.exports = function(context) {

    var backboneView = false;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            backboneView = backboneView || helper.isBackboneView(node);
        },
        "CallExpression:exit": function(node) {
            if (helper.isBackboneView(node)) {
                backboneView = false;
            }
        },
        "Identifier": function(node) {
            if (backboneView && node.name === "$") {
                var ancestors = context.getAncestors(node), parent = ancestors.pop();

                if (parent.type === "CallExpression") {
                    context.report(node, "Use this.$ instead of $ in views");
                }
            }
        }
    };

};
