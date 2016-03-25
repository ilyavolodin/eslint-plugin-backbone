/**
 * @fileoverview Prevent access to attributes collection inside models
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
            description: "Prevent access to attributes collection inside models",
            category: "Best Practices",
            recommended: true
        },
        schema: []
    },
    create: function(context) {

        var backboneModel = [];
        var settings = context.settings || /* istanbul ignore next */ {};

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "CallExpression": function(node) {
                backboneModel.push(backboneModel[backboneModel.length - 1] || helper.isBackboneModel(node, settings.backbone));
            },
            "CallExpression:exit": function(node) {
                if (helper.isBackboneModel(node, settings.backbone)) {
                    backboneModel.pop();
                }
            },
            "MemberExpression": function(node) {
                if (backboneModel[backboneModel.length - 1] &&
                    node.object.type === "ThisExpression" &&
                    node.property.name === "attributes") {
                        context.report(node, "Do not access attributes directly. Use set() and get() instead");
                    }
            }
        };
    }
};
