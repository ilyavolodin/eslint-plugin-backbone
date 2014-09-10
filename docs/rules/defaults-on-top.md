# Require defaults to be on top of the model (defaults-on-top)

If defaults are declared on the model, they should be declared as the very first thing to improve readability of the code.

## Rule Details

The following patterns are considered warnings:

```js

Backbone.Model.extend({
    initialize: function() {
        ...
    },
    defaults: {}
});

```

The following patterns are not warnings:

```js

Backbone.Model.extend({
    defaults: {},
    initialize: function() {
        ...
    }
});

```

## When Not To Use It

If you never use defaults, there's no reason to enable this rule

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Model-defaults)
