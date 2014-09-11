/**
 * @fileoverview Prevent usage of $ in the views
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
eslintTester.addRuleTest("lib/rules/no-native-jquery", {

    valid: [
        "Backbone.View.extend({});",
        "Backbone.View.extend({ render: function() { var a = this.$('.item').offset(); } });",
        "Backbone.View.extend({ test: function() { return $.isArray(a); } });",
        "Backbone.Model.extend({ initialize: function() { var a = $('.item').offset(); } });",
        "var a = 6 * 7;",
        "var a = $('.item').offset();"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ render: function() { var a = $('.item').offset(); } });",
            errors: 1
        },
        {
            code: "var a = Backbone.View.extend({ render: function() { var a = $('.item').offset(); } }); var b = Backbone.View.extend({ render: function() { var a = this.$('.item').offset() } });",
            errors: 1
        },
        {
            code: "Backbone.View.extend({ initialize: function() { Backbone.View.apply(this, arguments); var a = $('.item').offset(); } });",
            errors: 1
        }
    ]
});
