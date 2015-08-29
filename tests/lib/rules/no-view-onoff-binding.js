/**
 * @fileoverview Prevent using on/off bindings inside views
 * @author Ilya Volodin
 * @copyright 2015 Ilya Volodin. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-view-onoff-binding");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("no-view-onoff-binding", rule, {

    valid: [
        "Backbone.View.extend({ initialize: function() { this.$el.on('click', this.render); } });",
        "Backbone.Model.extend({ initialize: function() { this.collection.on('change', this.changeSomething); } });",
        "Backbone.View.extend({ initialize: function() { this.listenTo(this.model, 'change', this.render); } });",
        "Backbone.View.extend({ initialize: function() { this.model.attributes[0] = 'test'; } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ initialize: function() { this.model.on('change', this.render); } });",
            errors: [ { message: "Use listenTo instead of 'on'." } ]
        },
        {
            code: "Backbone.View.extend({ initialize: function() { this.collection.on('change', this.render); } });",
            errors: [ { message: "Use listenTo instead of 'on'." } ]
        },
        {
            code: "Backbone.View.extend({ initialize: function() { this.model.off('change', this.render); } });",
            errors: [ { message: "Use stopListening instead of 'off'." } ]
        },
        {
            code: "Backbone.View.extend({ initialize: function() { this.collection.off('change', this.render); } });",
            errors: [ { message: "Use stopListening instead of 'off'." } ]
        }
    ]
});
