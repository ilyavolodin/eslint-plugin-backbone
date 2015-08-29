/**
 * @fileoverview Prevent setting changed attribute of the model in views
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-changed-set");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("no-changed-set", rule, {

    valid: [
        "Backbone.View.extend({});",
        "Backbone.View.extend({ initialize: function() { alert(this.el); } });",
        "Backbone.View.extend({ render: function() { alert(this.model.changed); } });",
        "Backbone.Model.extend({ initialize: function() { this.model.changed = true; } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ render: function() { this.model.changed = false; } });",
            errors: [ { message: "Do not assign changed property of the model directly." } ]
        },
        {
            code: "Test.extend({ someFunction: function() { this.model.changed = false; } });",
            settings: { backbone: { View: ["Test"]}},
            errors: [ { message: "Do not assign changed property of the model directly." } ]
        }
    ]
});
