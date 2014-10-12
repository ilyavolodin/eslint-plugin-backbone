/**
 * @fileoverview Prevent using silent option in functions that cause events
 * @author Ilya Volodin
 * @copyright 2014 Ilya Volodin. All rights reserved.
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
eslintTester.addRuleTest("lib/rules/no-silent", {

    valid: [
        "Backbone.Model.extend({ intialize: function() { this.set('test', 'test'); } });",
        "Backbone.Collection.extend({ initialize: function() { this.create(model); } });",
        "Backbone.View.extend({ render: function() { this.collection.remove(model); } });",
        "Backbone.View.extend({ initialize: function() { this.render({silent: true }); } });",
        "Backbone.Collection.extend({ intialize: function() { this.remove(model, {silent: false}); } });"
    ],

    invalid: [
        {
            code: "Backbone.Model.extend({ intialize: function() { this.set('test', 'test', {silent:true}); } });",
            errors: 1
        },
        {
            code: "Backbone.Model.extend({ intialize: function() { this.unset('test', {silent:true}); } });",
            errors: 1
        },
        {
            code: "Backbone.Collection.extend({ intialize: function() { this.reset([], {silent:true}); } });",
            errors: 1
        },
        {
            code: "Backbone.Model.extend({ intialize: function() { this.clear({silent:true}); } });",
            errors: 1
        },
        {
            code: "Backbone.Collection.extend({ intialize: function() { this.remove(model, {silent:true}); } });",
            errors: 1
        },
        {
            code: "Backbone.Collection.extend({ intialize: function() { this.add(model, {silent:true}); } });",
            errors: 1
        },
        {
            code: "Backbone.Model.extend({ intialize: function() { this.collection.push({}, {silent:true}); } });",
            errors: 1
        }
    ]
});
