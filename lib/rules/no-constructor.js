/**
 * @fileoverview Prevent overloading of constructor
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../backbone-helper.js");

module.exports = function(context) {

    var settings = context.settings || /* istanbul ignore next */ {};

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Identifier": function(node) {
            if (node.name === "constructor") {
                if (helper.checkIfPropertyInBackbone(node, settings.backbone)) {
                    context.report(node, "Overload initialize instead of constructor");
                }
            }
        }
    };
};
