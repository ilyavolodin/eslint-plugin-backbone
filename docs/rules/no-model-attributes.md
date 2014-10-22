# Prevent access to attributes collection inside models (no-model-attributes)

Instead of accessing `attributes` collection directly from within models, use `get()` or `set()` functions. Backbone setters do more then just assign value, they also keep track of when model has been last modified. If you work with `attributes` collection directly, `changed` and `changedAttributes` will not be updated.


## Rule Details

The following patterns are considered warnings:

```js

Backbone.Model.extend({
    initialize: function() {
        _.first(this.attributes);
    }
});

```

The following patterns are not warnings:

```js

Backbone.Model.extend({
    initialize: function() {
        this.set('test', true);
    }
});

```

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Model-get)

## Related Rules

[no-view-model-attributes](no-view-model-attributes.md)