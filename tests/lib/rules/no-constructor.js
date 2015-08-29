/**
 * @fileoverview Prevent overloading of constructor
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-constructor");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("no-constructor", rule, {

    valid: [
        "Backbone.Model.extend({ initialize: function() { } });",
        "Backbone.View.extend({ initialize: function() { } });",
        "Backbone.Collection.extend({ initialize: function() { } });",
        "Backbone.Model.extend({ initialize: function() { var a = { constructor: function() { } }; } });"
    ],

    invalid: [
        {
            code: "Backbone.Model.extend({ constructor: function() {} });",
            errors: [ { message: "Overload initialize instead of constructor" } ]
        },
        {
            code: "Backbone.View.extend({ constructor: function() {} });",
            errors: [ { message: "Overload initialize instead of constructor" } ]
        },
        {
            code: "Backbone.Collection.extend({ constructor: function() {} });",
            errors: [ { message: "Overload initialize instead of constructor" } ]
        }
    ]
});
