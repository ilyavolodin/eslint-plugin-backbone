/**
 * @fileoverview Events should be the first thing registered in the View
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
eslintTester.addRuleTest("lib/rules/events-on-top", {

    valid: [
        "Backbone.View.extend({ events: {}, initialize: function() {} });",
        "Backbone.View.extend({ });",
        "Backbone.View.extend({ initialize: function() {} });",
        "Backbone.View.extend({ initialize: function() { var events = {}; } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ initialize: function() {}, events: {} });", errors: 1
        }
    ]
});
