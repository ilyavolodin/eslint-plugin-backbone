/**
 * @fileoverview Require defaults to be on top of the model
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../../backbone-helper.js");

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Identifier": function(node) {
            if (node.name === "defaults") {
                var ancestors = context.getAncestors(node);
                var parent = ancestors.pop(), grandparent = ancestors.pop(), greatgrandparent = ancestors.pop();
                if (helper.isBackboneModel(greatgrandparent) && grandparent.type === "ObjectExpression" &&  grandparent.properties[0] !== parent) {
                    context.report(node, "defaults should be declared at the top of the model.");
                }
            }
        }
    };

};
