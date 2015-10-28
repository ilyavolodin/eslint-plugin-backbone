/**
 * @fileoverview Prevent usage of native jQuery scoped to view elements
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-view-qualified-jquery");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ERROR_TEMPLATE = "Use {{placeholder}}.$ or {{placeholder}}.$el.find instead of view-scoped native jQuery";

function createErrorMessage(identifier) {
    return ERROR_TEMPLATE.replace(/\{\{placeholder\}\}/g, identifier);
}

var eslintTester = new RuleTester();
eslintTester.run("no-view-qualified-jquery", rule, {
    valid: [
        // Simple cases
        "$('.some-selector');",
        "jQuery('.some-selector');",
        "view.$('.some-selector');",
        "view.$el.find('.some-selector');",
        "$$('.some-selector', view.el)",
        "$('.some-selector', view.element)",

        // Rule should not warn if jQuery identifier is configured differently
        {
            code: "$('.some-selector', view.el);",
            options: [{ identifiers: ["myJQuery"] }]
        }
    ],

    invalid: [
        // Simple cases
        {
            code: "$('.some-selector', view.el);",
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "$('.some-selector', view.$el);",
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "$('.some-selector', $(view.el));",
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "$('.some-selector', $(view.$el));",
            errors: [{ message: createErrorMessage("view") }]
        },

        // Using jQuery identifier
        {
            code: "jQuery('.some-selector', view.el);",
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "jQuery('.some-selector', view.$el);",
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "jQuery('.some-selector', jQuery(view.el));",
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "jQuery('.some-selector', jQuery(view.$el));",
            errors: [{ message: createErrorMessage("view") }]
        },

        // Using different view identifier
        {
            code: "$('.some-selector', myView.el);",
            errors: [{ message: createErrorMessage("myView") }]
        },
        {
            code: "$('.some-selector', myView.$el);",
            errors: [{ message: createErrorMessage("myView") }]
        },
        {
            code: "$('.some-selector', $(myView.el));",
            errors: [{ message: createErrorMessage("myView") }]
        },
        {
            code: "$('.some-selector', $(myView.$el));",
            errors: [{ message: createErrorMessage("myView") }]
        },

        // Using different jQuery identifier
        {
            code: "myJQuery('.some-selector', view.el);",
            options: [{ identifiers: ["myJQuery"] }],
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "myJQuery('.some-selector', view.$el);",
            options: [{ identifiers: ["myJQuery"] }],
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "myJQuery('.some-selector', myJQuery(view.el));",
            options: [{ identifiers: ["myJQuery"] }],
            errors: [{ message: createErrorMessage("view") }]
        },
        {
            code: "myJQuery('.some-selector', myJQuery(view.$el));",
            options: [{ identifiers: ["myJQuery"] }],
            errors: [{ message: createErrorMessage("view") }]
        }
    ]
});
