/**
 * @fileoverview Event names in event hash should be sorted alphabetically
 * @author Frederik Ring
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../backbone-helper.js");

module.exports = {
    meta: {
        docs: {
            description: "Event names in event hash should be sorted alphabetically",
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
                if (node.name === "events") {
                    if (helper.checkIfPropertyInBackboneView(node, settings.backbone)) {
                        var keys = node.parent.value.properties.map(function(prop) {
                            return prop.key.value || prop.key.name;
                        });
                        var sortedKeys = keys.slice().sort();
                        for (var i = 0; i < keys.length; i++) {
                            if (keys[i] !== sortedKeys[i]){
                                context.report(node, "event names in event hash should be sorted alphabetically.");
                                break;
                            }
                        }
                    }
                }
            }
        };
    }
};
