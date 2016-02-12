/**
 * @fileoverview Prevent usage of $ in the views
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-native-jquery");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("no-native-jquery", rule, {

    valid: [
        "Backbone.View.extend({});",
        "Backbone.View.extend({ render: function() { var a = this.$('.item').offset(); } });",
        "Backbone.View.extend({ test: function() { return $.isArray(a); } });",
        "Backbone.Model.extend({ initialize: function() { var a = $('.item').offset(); } });",
        "var a = 6 * 7;",
        "var a = $('.item').offset();",
        { code: "Backbone.View.extend({ render: function(element) { $(element).show(); } });", options: ["selector"] },
        { code: "Backbone.View.extend({ render: function() { var a = $('<div></div>'); } });", options: ["selector"] }
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ render: function() { var a = $('.item').offset(); } });",
            errors: [ { message: "Use this.$ instead of $ in views" } ]
        },
        {
            code: "var a = Backbone.View.extend({ render: function() { var a = $('.item').offset(); } }); var b = Backbone.View.extend({ render: function() { var a = this.$('.item').offset() } });",
            errors: [ { message: "Use this.$ instead of $ in views" } ]
        },
        {
            code: "Backbone.View.extend({ initialize: function() { Backbone.View.apply(this, arguments); var a = $('.item').offset(); } });",
            errors: [ { message: "Use this.$ instead of $ in views" } ]
        },
        {
            code: "Backbone.View.extend({ render: function(element) { $(element).show(); } });", options: ["all"],
            errors: [ { message: "Use this.$ instead of $ in views" } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { $('.item').show(); } });", options: ["selector"],
            errors: [ { message: "Use this.$ instead of $ in views" } ]
        }
    ]
});
