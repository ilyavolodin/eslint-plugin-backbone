/**
 * @fileoverview Prevent access to collection's models property inside views
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
eslintTester.addRuleTest("lib/rules/no-view-collection-models", {

    valid: [
        "Backbone.View.extend({});",
        "Backbone.View.extend({ initialize: function() { alert(this.el); } });",
        "Backbone.View.extend({ render: function() { alert(this.models); } });",
        "Backbone.Collection.extend({ initialize: function() { this.models = true; } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ render: function() { alert(this.model.models.length); } });",
            errors: [ { message: "Do not access models directly. Use get() and at() methods instead." } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { this.collection.models[0] = 'test'; } });",
            errors: [ { message: "Do not access models directly. Use get() and at() methods instead." } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { _.first(this.model.models); } });",
            errors: [ { message: "Do not access models directly. Use get() and at() methods instead." } ]
        },
        {
            code: "Backbone.View.extend({ render: function() { this.model.models[0] = 'test'; this.collection.models[1] = 'test'; } });",
            errors: [ { message: "Do not access models directly. Use get() and at() methods instead." }, { message: "Do not access models directly. Use get() and at() methods instead." } ]
        }
    ]
});
