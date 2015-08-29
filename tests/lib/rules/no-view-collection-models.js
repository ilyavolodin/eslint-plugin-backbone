/**
 * @fileoverview Prevent access to collection's models property inside views
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-view-collection-models");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run("no-view-collection-models", rule, {

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
