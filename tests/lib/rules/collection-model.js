/**
 * @fileoverview Require all collections to declare model
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
eslintTester.addRuleTest("lib/rules/collection-model", {

    valid: [
        "Backbone.Collection.extend({ model: {}});",
        "Backbone.Collection.extend({ initialize: function() { }, model: {} });",
        "var a = Backbone.Collection.extend({ model: {} }); var b = Backbone.Collection.extend({ model: {} });",
        "Backbone.Collection.extend({ constructor: function() { Backbone.Collection.apply(this, arguments); }, model: {} });",
        "Backbone.Collection.extend({ initialize: function() { var a = Backbone.Collection.extend({ model: {} });}, model: {} });",
        "Backbone.Model.extend();",
        "var a = 6 * 7;",
        { code: "TestCollection.extend({ model: {}});", settings: { backbone: { Collection: ["TestCollection"] } } },
        { code: "Backbone.NestedCollection.extend({ model: {}});", settings: { backbone: { Collection: ["Backbone.NestedCollection"] } } },
        { code: "Backbone.Collection.extend({ model: {}});", settings: { backbone: { Collection: ["Backbone.NestedCollection"] } } }
    ],

    invalid: [
        {
            code: "Backbone.Collection.extend({});",
            errors: [ { message: "All collections should have model declared" } ]
        },
        {
            code: "var a = Backbone.Collection.extend({}); var b = Backbone.Collection.extend({ model: {} });",
            errors: [ { message: "All collections should have model declared" } ]
        },
        {
            code: "var a = Backbone.Collection.extend({}); var b = Backbone.Collection.extend();",
            errors: [ { message: "All collections should have model declared" }, { message: "All collections should have model declared"} ]
        },
        {
            code: "Backbone.Collection.extend({ initialize: function() { var a = { model: {} }; } });",
            errors: [ { message: "All collections should have model declared" } ]
        },
        {
            code: "Backbone.Collection.extend({ initialize: function() { var a = Backbone.Collection.extend({});}, model: {} });",
            errors: [ { message: "All collections should have model declared" } ]
        },
        {
            code: "Backbone.NestedCollection.extend({ initialize: function() { } });",
            settings: { backbone: { Collection: ["Backbone.NestedCollection"] } },
            errors: [ { message: "All collections should have model declared" } ]
        },
        {
            code: "TestCollection.extend({ initialize: function() { var a = { model: {} }; } });",
            settings: { backbone: { Collection: ["TestCollection"] } },
            errors: [ { message: "All collections should have model declared" } ]
        },
        {
            code: "Backbone.Collection.extend({ initialize: function() { var a = { model: {} }; } }); TestCollection.extend({ initialize: function() {} });",
            settings: { backbone: { Collection: ["TestCollection"] } },
            errors: [ { message: "All collections should have model declared" }, { message: "All collections should have model declared"} ]
        }
    ]
});
