/**
 * @fileoverview Enforces render function to always return this
 * @author Ilya Volodin
 * @copyright 2014 Ilya Volodin. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("eslint").linter,
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/render-return", {

    valid: [
        "Backbone.View.extend({ render: function() { return this; } });",
        "Backbone.View.extend({ initialize: function() { var test = { render: function() { } }; } });",
        "Backbone.Model.extend({ render: function() { } });",
        "Backbone.View.extend({ initialize: function() { return this; } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ render: function() { } });",
            errors: [ { message: "render method should always return 'this'" } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { return 1; } });",
            errors: [ { message: "render method should always return 'this'" } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { return; } });",
            errors: [ { message: "render method should always return 'this'" } ]
        }
    ]
});
