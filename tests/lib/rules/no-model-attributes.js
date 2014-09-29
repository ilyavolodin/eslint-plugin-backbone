/**
 * @fileoverview Prevent access to attributes collection inside models
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
eslintTester.addRuleTest("lib/rules/no-model-attributes", {

    valid: [
        "Backbone.Model.extend({});",
        "Backbone.Model.extend({ initialize: function() { } });",
        "Backbone.Model.extend({ initialize: function() { alert(this.get('test')); } });",
        "Backbone.Model.extend({ initialize: function() { this.set('test', true); } });"
    ],

    invalid: [
        {
            code: "Backbone.Model.extend({ initialize: function() { alert(this.attributes); } });",
            errors: 1
        },
        {
            code: "Backbone.Model.extend({ initialize: function() { _.first(this.attributes); } });",
            errors: 1
        }
    ]
});
