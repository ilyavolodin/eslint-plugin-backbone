/**
 * @fileoverview require all models to have defaults section
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
eslintTester.addRuleTest("lib/rules/model-defaults", {

    valid: [
        "Backbone.Model.extend({ defaults: {}});",
        "Backbone.Model.extend({ initialize: function() { }, defaults: {} });",
        "var a = Backbone.Model.extend({ defaults: {} }); var b = Backbone.Models.extend({ defaults: {} });",
        "Backbone.Model.extend({ constructor: function() { Backbone.Model.apply(this, arguments); }, defaults: {} });",
        "Backbone.Model.extend({ initialize: function() { var a = Backbone.Model.extend({ defaults: {} });}, defaults: {} });",
        "Backbone.Models.extend();",
        "var a=6 * 7;",
        "Backbone.Model.extend({ defaults: {}, initialize: function() { alert(); } });"
    ],

    invalid: [
        {
            code: "Backbone.Model.extend({});",
            errors: [ { message: "All models should have defaults declared" } ]
        },
        {
            code: "var a = Backbone.Model.extend({}); var b = Backbone.Model.extend({ defaults: {} });",
            errors: [ { message: "All models should have defaults declared" } ]
        },
        {
            code: "Backbone.Model.extend({ initialize: function() { var a = { defaults: {} }; } });",
            errors: [ { message: "All models should have defaults declared" } ]
        },
        {
            code: "Backbone.Model.extend({ initialize: function() { var a = Backbone.Model.extend({});}, defaults: {} });",
            errors: [ { message: "All models should have defaults declared" } ]
        }
    ]
});
