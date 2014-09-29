/**
 * @fileoverview Prevent access to models property of collections
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
eslintTester.addRuleTest("lib/rules/no-collection-models", {

    valid: [
        "Backbone.Collection.extend({});",
        "Backbone.Collection.extend({ initialize: function() { } });",
        "Backbone.Collection.extend({ initialize: function() { alert(this.at(0)); } });",
        "Backbone.Collection.extend({ initialize: function() { this.get(10); } });"
    ],

    invalid: [
        {
            code: "Backbone.Collection.extend({ initialize: function() { this.models.length; } });",
            errors: 1
        },
        {
            code: "Backbone.Collection.extend({ initialize: function() { this.models.push({}); } });",
            errors: 1
        }
    ]
});
