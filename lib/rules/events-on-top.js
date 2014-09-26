/**
 * @fileoverview Events should be the first thing registered in the View
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
            if (node.name === "events") {
                var parent = node.parent, grandparent = parent.parent;
                if (helper.checkIfPropertyInBackboneView(node, context.settings.backbone) && grandparent.type === "ObjectExpression" &&  grandparent.properties[0] !== parent) {
                    context.report(node, "events should be declared at the top of the view.");
                }
            }
        }
    };
};
