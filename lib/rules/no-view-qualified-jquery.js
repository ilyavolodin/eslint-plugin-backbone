/**
 * @fileoverview Prevent usage of native jQuery scoped to view elements
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var DEFAULT_JQUERY_ALIASES = ["jQuery", "$"],
    VIEW_ELEMENT_MEMBERS = ["el", "$el"],
    ERROR_TEMPLATE = "Use {{identifier}}.$ or {{identifier}}.$el.find instead of view-scoped native jQuery";

module.exports = {
    meta: {
        docs: {
            description: "Prevent usage of global $ to reach view elements",
            category: "Best Practices",
            recommended: false,
            url: "https://github.com/ilyavolodin/eslint-plugin-backbone/tree/master/docs/rules/no-view-qualified-jquery.md"
        },
        schema: [
            {
                type: "object",
                properties: {
                    identifiers: {
                        type: "array"
                    }
                },
                additionalProperties: false
            }
        ]
    },
    create: function(context) {
        var options,
            sourceCode = context.getSourceCode();

        options = context.options[0] || {
            identifiers: DEFAULT_JQUERY_ALIASES
        };

        function isNativeJQuery(node) {
            return node.type === "Identifier" &&
                options.identifiers.indexOf(node.name) !== -1;
        }

        function isPotentialViewElement(node) {
            return node.type === "MemberExpression" &&
                node.property &&
                node.property.type === "Identifier" &&
                VIEW_ELEMENT_MEMBERS.indexOf(node.property.name) !== -1;
        }

        function isJQueryWrappedPotentialViewElement(node) {
            return node.type === "CallExpression" &&
                node.arguments.length &&
                isNativeJQuery(node.callee) &&
                isPotentialViewElement(node.arguments[0]);
        }

        function isArgumentViewQualifier(node) {
            return isPotentialViewElement(node) ||
                isJQueryWrappedPotentialViewElement(node);
        }

        function getViewIdentifier(node) {
            if (isPotentialViewElement(node)) {
                return sourceCode.getText(node.object);
            }

            return sourceCode.getText(node.arguments[0].object);
        }

        function checkForViewQualifiedJQuery(node) {
            // View qualified jQuery is defined in terms of second argument to
            // jQuery call. Argument may be in the form of view.el, view.$el, or
            // $(view.el) or $(view.$el).

            if (isArgumentViewQualifier(node.arguments[1])) {
                context.report(node, ERROR_TEMPLATE, {
                    identifier: getViewIdentifier(node.arguments[1])
                });
            }
        }

        return {
            "CallExpression": function(node) {
                if (isNativeJQuery(node.callee) && node.arguments.length > 1) {
                    checkForViewQualifiedJQuery(node);
                }
            }
        };
    }
};
