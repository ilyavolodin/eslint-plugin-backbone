/**
 * @fileoverview Require defaults to be on top of the model
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
eslintTester.addRuleTest("lib/rules/defaults-on-top", {

    valid: [
        "Backbone.Model.extend({ defaults: {}, initialize: function() {} });",
        "Backbone.Model.extend({ });",
        "Backbone.Model.extend({ initialize: function() {} });",
        "Backbone.Model.extend({ initialize: function() { var defaults = {}; } });"
    ],

    invalid: [
        {
            code: "Backbone.Model.extend({ initialize: function() {}, defaults: {} });",
            errors: [ { message: "defaults should be declared at the top of the model." } ]
        }
    ]
});
