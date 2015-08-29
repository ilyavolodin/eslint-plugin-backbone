/**
 * @fileoverview Prevent access to attributes collection inside models
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-model-attributes");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("no-model-attributes", rule, {

    valid: [
        "Backbone.Model.extend({});",
        "Backbone.Model.extend({ initialize: function() { } });",
        "Backbone.Model.extend({ initialize: function() { alert(this.get('test')); } });",
        "Backbone.Model.extend({ initialize: function() { this.set('test', true); } });"
    ],

    invalid: [
        {
            code: "Backbone.Model.extend({ initialize: function() { alert(this.attributes); } });",
            errors: [ { message: "Do not access attributes directly. Use set() and get() instead" } ]
        },
        {
            code: "Backbone.Model.extend({ initialize: function() { _.first(this.attributes); } });",
            errors: [ { message: "Do not access attributes directly. Use set() and get() instead" } ]
        }
    ]
});
