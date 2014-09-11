# Require all collections to declare model (collection-model)

Declaring model type on a collection will allow you to pass raw objects into create, add and reset methods of that collection. This simplifies code and improves readability.


## Rule Details

The following patterns are considered warnings:

```js

Backbone.Collection.extend({
    initialize: function() {
        ...
    }
});

```

The following patterns are not warnings:

```js

Backbone.Collection.extend({
    model: Book,
    initialize: function() {
        ...
    }
});

```

## When Not To Use It

If you prefer to always pass models into collection methods you can disable this rule.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Collection-model)
