/**
 * @fileoverview Prevent assigning el or $el inside views
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
eslintTester.addRuleTest("lib/rules/no-el-assign", {

    valid: [
        "Backbone.View.extend({});",
        "Backbone.View.extend({ initialize: function() { alert(this.el); } });",
        "Backbone.View.extend({ initialize: function() { var a = this.$el; } });",
        "Backbone.Model.extend({ initialize: function() { this.el = 'test'; } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ initialize: function() { this.$el = $('.test'); } });", errors: 1
        },
        {
            code: "Test.extend({ initialize: function() { this.el = $('.test')[0]; } });", settings: { backbone: { View: ["Test"] }}, errors: 1
        }
    ]
});
