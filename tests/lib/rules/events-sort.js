/**
 * @fileoverview Event names in event hash should be sorted alphabetically
 * @author Frederik Ring
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/events-sort");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("events-sort", rule, {

    valid: [
        "Backbone.View.extend({ events: {}, initialize: function() {} });",
        "Backbone.View.extend({ events: {'click': 'handleClick', 'submit': 'handleSubmit'}, initialize: function() {} });",
        "Backbone.View.extend({ events: { click: 'handleClick', 'submit': 'handleSubmit'}, initialize: function() {} });",
        "Backbone.View.extend({ });",
        "Backbone.View.extend({ initialize: function() {} });",
        "Backbone.View.extend({ initialize: function() { var events = {'foo': '2', 'bar': 3}; } });",
        "Backbone.View.extend({ events: {'blur': 'handleBlur', 'click': 'handleClick', 'submit': 'handleSubmit'} });",
        "Backbone.View.extend({ events: {'blur .a': 'handleBlur', 'blur .b': 'handleBlur', 'blur .c': 'handleBlur'} });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ events: {'submit': 'handleSubmit', 'click': 'handleClick'} });",
            errors: [ { message: "event names in event hash should be sorted alphabetically." } ]
        },
        {
            code: "Backbone.View.extend({ events: {'blur': 'handleBlur', 'submit': 'handleSubmit', 'click': 'handleClick'} });",
            errors: [ { message: "event names in event hash should be sorted alphabetically." } ]
        },
        {
            code:         "Backbone.View.extend({ events: {'blur .a': 'handleBlur', 'blur .z': 'handleBlur', 'blur .c': 'handleBlur'} });",
            errors: [ { message: "event names in event hash should be sorted alphabetically." } ]
        },
        {
            code: "Backbone.View.extend({ events: {submit: 'handleSubmit', 'click': 'handleClick'} });",
            errors: [ { message: "event names in event hash should be sorted alphabetically." } ]
        }
    ]
});
