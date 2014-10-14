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
        "Backbone.View.extend({ initialize: function() { var events = {}; } });",
        { code: "Backbone.View.extend({ tagName: 'div', 'className': 'test', events: {} });", args: [1, ["tagName", "className"]] }
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ initialize: function() {}, events: {} });",
            errors: [ { message: "events should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.View.extend({ initialize: function() {}, tagName: 'div', 'className': 'test', events: {} });", args: [1, ["tagName", "className"]],
            errors: [ { message: "events should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.View.extend({ tagName: 'div', initialize: function() {}, 'className': 'test', events: {} });", args: [1, ["tagName", "className"]],
            errors: [ { message: "events should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.View.extend({ render: function() {}, initialize: function() {}, 'className': 'test', events: {} });", args: [1, ["tagName", "className"]],
            errors: [ { message: "events should be declared at the top of the view." } ]
        }
    ]
});
