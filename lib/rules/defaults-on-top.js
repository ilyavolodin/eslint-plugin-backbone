/**
 * @fileoverview Require defaults to be on top of the model
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../backbone-helper.js");

module.exports = {
    meta: {
        docs: {
            description: "Require defaults to be on top of the model",
            category: "Stylistic",
            recommended: false
        },
        schema: [
            {
                "type": "array",
                "items": {
                    "type": "string",
                    "uniqueItems": true
                },
                "additionalProperties": false
            }
        ]
    },
    create: function(context) {

        var settings = context.settings || /* istanbul ignore next */ {};

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "Identifier": function(node) {
                if (node.name === "defaults") {
                    var parent = node.parent, grandparent = parent.parent;
                    if (helper.checkIfPropertyInBackboneModel(node, settings.backbone) && grandparent.type === "ObjectExpression" && grandparent.properties[0] !== parent) {
                        if (context.options && context.options.length > 0) {
                            //we have exceptions passed into the rule, verify that any property that goes before events is in the options list
                            for (var i = 0, l = grandparent.properties.length; i < l; i++) {
                                if (grandparent.properties[i] === parent) {
                                    break;
                                }
                                if ((grandparent.properties[i].key.type === "Identifier" && context.options[0].indexOf(grandparent.properties[i].key.name) === -1) ||
                                    (grandparent.properties[i].key.type === "Literal" && context.options[0].indexOf(grandparent.properties[i].key.value) === -1)) {
                                    context.report(node, "defaults should be declared at the top of the model.");
                                    break;
                                }
                            }
                        } else {
                            context.report(node, "defaults should be declared at the top of the model.");
                        }
                    }
                }
            }
        };
    }
};
