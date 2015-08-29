/**
 * @fileoverview Prevent assigning el or $el inside views
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-el-assign");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("no-el-assign", rule, {

    valid: [
        "Backbone.View.extend({});",
        "Backbone.View.extend({ initialize: function() { alert(this.el); } });",
        "Backbone.View.extend({ initialize: function() { var a = this.$el; } });",
        "Backbone.Model.extend({ initialize: function() { this.el = 'test'; } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ initialize: function() { this.$el = $('.test'); } });",
            errors: [ { message: "Do not assign '$el' directly. Use setElement() instead" } ]
        },
        {
            code: "Test.extend({ initialize: function() { this.el = $('.test')[0]; } });", settings: { backbone: { View: ["Test"] }},
            errors: [ { message: "Do not assign 'el' directly. Use setElement() instead" } ]
        }
    ]
});
