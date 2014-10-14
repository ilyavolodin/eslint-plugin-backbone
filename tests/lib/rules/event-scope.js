/**
 * @fileoverview Verify that scope is passed into event handlers
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
eslintTester.addRuleTest("lib/rules/event-scope", {

    valid: [
        "Backbone.Collection.extend({});",
        "Backbone.Model.extend({ initialize: function() { this.on('change', this.test, this); } });",
        "Backbone.View.extend({ initialize: function() { this.model.on('change', this.test, this); } });",
        "Backbone.View.extend({ initialize: function() { this.$el.on('click', this.test); } });",
        "Backbone.View.extend({ intiailize: function() { $('test').on('click', this.test); } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ initialize: function() { this.model.on('change', this.modelChanged); } });",
            errors: [ { message: "Pass scope as third argument." } ]
        },
        {
            code: "Backbone.Model.extend({ initialize: function() { this.model.once('change', this.modelChanged); } })",
            errors: [ { message: "Pass scope as third argument." } ]
        }
    ]
});
