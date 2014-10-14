/**
 * @fileoverview Requires initialize to be the first property of Backbone Views/Models/Collections
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
eslintTester.addRuleTest("lib/rules/initialize-on-top", {

    valid: [
        "Backbone.View.extend({ initialize: function() {} });",
        "Backbone.View.extend({ });",
        "Backbone.Model.extend({ initialize: function() {} });",
        "Backbone.Model.extend({ });",
        "Backbone.Collection.extend({ initialize: function() {} });",
        "Backbone.Collection.extend({ });",
        "Backbone.View.extend({ render: function() {} });",
        { code: "Backbone.Model.extend({ defaults: {}, initialize: function() {} });", args: [1, { Model: ["defaults"] }] },
        { code: "Backbone.View.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", args: [1, { View: ["tagName", "className", "events"] }] },
        { code: "Backbone.Collection.extend({ model: {}, initialize: function() {} });", args: [1, { Collection: ["model"] }] }
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", args: [1, { View: ["className", "events"] }],
            errors: [ { message: "Initialize should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.Collection.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", args: [1, { View: ["className", "events"], Collection: ["tagName"] }],
            errors: [ { message: "Initialize should be declared at the top of the collection." } ]
        },
        {
            code: "Backbone.Model.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", args: [1, { View: ["tagName", "className", "events"] }],
            errors: [ { message: "Initialize should be declared at the top of the model." } ]
        },
        {
            code: "Backbone.View.extend({ tagName: 'div', initialize: function() {} });",
            errors: [ { message: "Initialize should be declared at the top." } ]
        },
        {
            code: "Backbone.View.extend({ tagName: 'div', 'className': 'test', events: {}, initialize: function() {} });", args: [1, { Model: ["defaults"] }],
            errors: [ { message: "Initialize should be declared at the top of the view." } ]
        },
        {
            code: "Backbone.Model.extend({ defaults: {}, initialize: function() {} });", args: [1, { View: ["className", "events"] }],
            errors: [ { message: "Initialize should be declared at the top of the model." } ]
        },
        {
            code: "Backbone.Collection.extend({ model: {}, initialize: function() {} });", args: [1, { View: ["className", "events"] }],
            errors: [ { message: "Initialize should be declared at the top of the collection." } ]
        }
    ]
});
