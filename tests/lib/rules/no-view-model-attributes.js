/**
 * @fileoverview Prevent access to model's attributes collection inside views
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
eslintTester.addRuleTest("lib/rules/no-view-model-attributes", {

    valid: [
        "Backbone.View.extend({});",
        "Backbone.View.extend({ initialize: function() { alert(this.el); } });",
        "Backbone.View.extend({ render: function() { alert(this.attributes); } });",
        "Backbone.Model.extend({ initialize: function() { this.attributes = true; } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ render: function() { alert(this.model.attributes[0]); } });",
            errors: [ { message: "Do not access attributes directly. Use set() and get() instead" } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { this.model.attributes[0] = 'test'; } });",
            errors: [ { message: "Do not access attributes directly. Use set() and get() instead" } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { _.first(this.model.attributes); } });",
            errors: [ { message: "Do not access attributes directly. Use set() and get() instead" } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { this.model.attributes[0] = 'test'; this.model.attributes[1] = 'test'; } });",
            errors: [ { message: "Do not access attributes directly. Use set() and get() instead" }, { message: "Do not access attributes directly. Use set() and get() instead" } ]
        }
    ]
});
