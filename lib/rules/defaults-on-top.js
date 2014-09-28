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

    var settings = context.settings || /* istanbul ignore next */ {};

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Identifier": function(node) {
            if (node.name === "defaults") {
                var parent = node.parent, grandparent = parent.parent;
                if (helper.checkIfPropertyInBackboneModel(node, settings.backbone) && grandparent.type === "ObjectExpression" &&  grandparent.properties[0] !== parent) {
                    context.report(node, "defaults should be declared at the top of the model.");
                }
            }
        }
    };

};
