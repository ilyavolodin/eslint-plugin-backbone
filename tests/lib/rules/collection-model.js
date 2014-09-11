/**
 * @fileoverview Require all collections to declare model
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
eslintTester.addRuleTest("lib/rules/collection-model", {

    valid: [
        "Backbone.Collection.extend({ model: {}});",
        "Backbone.Collection.extend({ initialize: function() { }, model: {} });",
        "var a = Backbone.Collection.extend({ model: {} }); var b = Backbone.Collection.extend({ model: {} });",
        "Backbone.Collection.extend({ constructor: function() { Backbone.Collection.apply(this, arguments); }, model: {} });",
        "Backbone.Collection.extend({ initialize: function() { var a = Backbone.Collection.extend({ model: {} });}, model: {} });",
        "Backbone.Model.extend();",
        "var a=6 * 7;"
    ],

    invalid: [
        {
            code: "Backbone.Collection.extend({});",
            errors: 1
        },
        {
            code: "var a = Backbone.Collection.extend({}); var b = Backbone.Collection.extend({ model: {} });",
            errors: 1
        },
        {
            code: "var a = Backbone.Collection.extend({}); var b = Backbone.Collection.extend();",
            errors: 2
        },
        {
            code: "Backbone.Collection.extend({ initialize: function() { var a = { model: {} }; } });",
            errors: 1
        },
        {
            code: "Backbone.Collection.extend({ initialize: function() { var a = Backbone.Collection.extend({});}, model: {} });",
            errors: 1
        }
    ]
});
