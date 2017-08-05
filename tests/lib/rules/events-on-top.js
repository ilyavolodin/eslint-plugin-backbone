/**
 * @fileoverview Events should be the first thing registered in the View
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/events-on-top");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("events-on-top", rule, {

    valid: [
        "Backbone.View.extend({ events: {}, initialize: function() {} });",
        "Backbone.View.extend({ });",
        "Backbone.View.extend({ initialize: function() {} });",
        "Backbone.View.extend({ initialize: function() { var events = {}; } });",
        { code: "Backbone.View.extend({ tagName: 'div', 'className': 'test', events: {} });", options: [["tagName", "className"]] },
        "var events;"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ initialize: function() {}, events: {} });",
            errors: [ { message: "events should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.View.extend({ initialize: function() {}, tagName: 'div', 'className': 'test', events: {} });", options: [["tagName", "className"]],
            errors: [ { message: "events should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.View.extend({ tagName: 'div', initialize: function() {}, 'className': 'test', events: {} });", options: [["tagName", "className"]],
            errors: [ { message: "events should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.View.extend({ render: function() {}, initialize: function() {}, 'className': 'test', events: {} });", options: [["tagName", "className"]],
            errors: [ { message: "events should be declared at the top of the view." } ]
        }
    ]
});

eslintTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 8,
        sourceType: "module"
    }
});
eslintTester.run("events-on-top", rule, {
    valid: [
        "export default events;"
    ],
    invalid: []
});
