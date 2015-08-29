/**
 * @fileoverview Prevent using silent option in functions that cause events
 * @author Ilya Volodin
 * @copyright 2014 Ilya Volodin. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-silent");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("no-silent", rule, {

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
            errors: [ { message: "Do not silence events." } ]
        },
        {
            code: "Backbone.Model.extend({ intialize: function() { this.unset('test', {silent:true}); } });",
            errors: [ { message: "Do not silence events." } ]
        },
        {
            code: "Backbone.Collection.extend({ intialize: function() { this.reset([], {silent:true}); } });",
            errors: [ { message: "Do not silence events." } ]
        },
        {
            code: "Backbone.Model.extend({ intialize: function() { this.clear({silent:true}); } });",
            errors: [ { message: "Do not silence events." } ]
        },
        {
            code: "Backbone.Collection.extend({ intialize: function() { this.remove(model, {silent:true}); } });",
            errors: [ { message: "Do not silence events." } ]
        },
        {
            code: "Backbone.Collection.extend({ intialize: function() { this.add(model, {silent:true}); } });",
            errors: [ { message: "Do not silence events." } ]
        },
        {
            code: "Backbone.Model.extend({ intialize: function() { this.collection.push({}, {silent:true}); } });",
            errors: [ { message: "Do not silence events." } ]
        }
    ]
});
