# Require all models to have defaults section (model-defaults)

When creating a Backbone model, you should always specify defaults. While this is not required by Backbone itself, it increases readability of the code and helps clearly identify properties that should be expected to be in the model. If the model is served from the server-side as JSON, it's sometimes very hard to understand which properties can be expected to be available.

## Rule Details

This rule aims to verify that every Backbone model has defaults declared

The following patterns are considered warnings:

```js
Backbone.Model.extend({ 
    initialize: function() { ... }
});

```

The following patterns are not warnings:

```js

Backbone.Model.extend({
    initialize: function() { ... },
    defaults: { ... }
})

```

## When Not To Use It

When the models are created purely on the client-side or when models are created empty.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Model-defaults)
