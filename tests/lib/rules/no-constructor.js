/**
 * @fileoverview Prevent overloading of constructor
 * @author Ilya Volodin
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
eslintTester.addRuleTest("lib/rules/no-constructor", {

    valid: [
        "Backbone.Model.extend({ initialize: function() { } });",
        "Backbone.View.extend({ initialize: function() { } });",
        "Backbone.Collection.extend({ initialize: function() { } });",
        "Backbone.Model.extend({ initialize: function() { var a = { constructor: function() { } }; } });"
    ],

    invalid: [
        {
            code: "Backbone.Model.extend({ constructor: function() {} });",
            errors: 1
        },
        {
            code: "Backbone.View.extend({ constructor: function() {} });",
            errors: 1
        },
        {
            code: "Backbone.Collection.extend({ constructor: function() {} });",
            errors: 1
        }
    ]
});
