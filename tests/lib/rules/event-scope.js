/**
 * @fileoverview Verify that scope is passed into event handlers
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/event-scope");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("event-scope", rule, {

    valid: [
        "Backbone.Collection.extend({});",
        "Backbone.Model.extend({ initialize: function() { this.on('change', this.test, this); } });",
        "Backbone.View.extend({ initialize: function() { this.model.on('change', this.test, this); } });",
        "Backbone.View.extend({ initialize: function() { this.$el.on('click', this.test); } });",
        "Backbone.View.extend({ initialize: function() { $('test').on('click', this.test); } });",
        "Backbone.View.extend({ initialize: function() { this.$('.something').on('change', this.update); } });"
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
