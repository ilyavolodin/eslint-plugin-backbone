/**
 * @fileoverview Prevent overloading of constructor
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
            if (node.name === "constructor") {
                if (helper.checkIfPropertyInBackbone(node, context.settings.backbone)) {
                    context.report(node, "Overload initialize instead of constructor");
                }
            }
        }
    };
};
