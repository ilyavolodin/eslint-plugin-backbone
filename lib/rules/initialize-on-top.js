/**
 * @fileoverview Requires initialize to be the first property of Backbone Views/Models/Collections
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
            description: "Requires initialize to be the first property of Backbone Views/Models/Collections",
            category: "Stylistic",
            recommended: false
        },
        schema: [
            {
                "type": "object",
                "properties": {
                    "View": {
                        "type": "array",
                        "value": "string"
                    },
                    "Model": {
                        "type": "array",
                        "value": "string"
                    },
                    "Collection": {
                        "type": "array",
                        "value": "string"
                    }
                }
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
                if (node.name === "initialize") {
                    var parent = node.parent, grandparent = parent.parent;
                    if (helper.checkIfPropertyInBackbone(node, settings.backbone) && grandparent.type === "ObjectExpression" && grandparent.properties[0] !== parent) {
                        if (context.options && context.options.length > 0) {
                            var backboneTypeOptions = [];
                            var backboneType = "";
                            if (helper.checkIfPropertyInBackboneView(node, settings.backbone)) {
                                backboneTypeOptions = context.options[0].View ? context.options[0].View : [];
                                backboneType = "view";
                            } else if (helper.checkIfPropertyInBackboneModel(node, settings.backbone)) {
                                backboneTypeOptions = context.options[0].Model ? context.options[0].Model : [];
                                backboneType = "model";
                            } else {
                                backboneTypeOptions = context.options[0].Collection ? context.options[0].Collection : [];
                                backboneType = "collection";
                            }

                            //we have exceptions passed into the rule, verify that any property that goes before initialize is in the options list
                            for (var i = 0, l = grandparent.properties.length; i < l; i++) {
                                if (grandparent.properties[i] === parent) {
                                    break;
                                }
                                if ((grandparent.properties[i].key.type === "Identifier" && backboneTypeOptions.indexOf(grandparent.properties[i].key.name) === -1) ||
                                    (grandparent.properties[i].key.type === "Literal" && backboneTypeOptions.indexOf(grandparent.properties[i].key.value) === -1)) {
                                    context.report(node, "Initialize should be declared at the top of the {{type}}.", { type: backboneType });
                                    break;
                                }
                            }
                        } else {
                            context.report(node, "Initialize should be declared at the top.");
                        }
                    }
                }
            }
        };
    }
};
