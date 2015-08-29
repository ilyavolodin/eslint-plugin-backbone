/**
 * @fileoverview Requires initialize to be the first property of Backbone Views/Models/Collections
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/initialize-on-top");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("initialize-on-top", rule, {

    valid: [
        "Backbone.View.extend({ initialize: function() {} });",
        "Backbone.View.extend({ });",
        "Backbone.Model.extend({ initialize: function() {} });",
        "Backbone.Model.extend({ });",
        "Backbone.Collection.extend({ initialize: function() {} });",
        "Backbone.Collection.extend({ });",
        "Backbone.View.extend({ render: function() {} });",
        { code: "Backbone.Model.extend({ defaults: {}, initialize: function() {} });", options: [{ Model: ["defaults"] }] },
        { code: "Backbone.View.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", options: [{ View: ["tagName", "className", "events"] }] },
        { code: "Backbone.Collection.extend({ model: {}, initialize: function() {} });", options: [{ Collection: ["model"] }] }
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", options: [{ View: ["className", "events"] }],
            errors: [ { message: "Initialize should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.Collection.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", options: [{ View: ["className", "events"], Collection: ["tagName"] }],
            errors: [ { message: "Initialize should be declared at the top of the collection." } ]
        },
        {
            code: "Backbone.Model.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", options: [{ View: ["tagName", "className", "events"] }],
            errors: [ { message: "Initialize should be declared at the top of the model." } ]
        },
        {
            code: "Backbone.View.extend({ tagName: 'div', initialize: function() {} });",
            errors: [ { message: "Initialize should be declared at the top." } ]
        },
        {
            code: "Backbone.View.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", options: [{ Model: ["defaults"] }],
            errors: [ { message: "Initialize should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.Model.extend({ defaults: {}, initialize: function() {} });", options: [{ View: ["className", "events"] }],
            errors: [ { message: "Initialize should be declared at the top of the model." } ]
        },
        {
            code: "Backbone.Collection.extend({ model: {}, initialize: function() {} });", options: [{ View: ["className", "events"] }],
            errors: [ { message: "Initialize should be declared at the top of the collection." } ]
        }
    ]
});
