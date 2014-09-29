# Prevent setting changed attribute of the model in views (no-changed-set)

Changed attribute is automatically computed by Backbone and modified when any property of the model has been updated. Manually changing it can lead to problems.

## Rule Details

The following patterns are considered warnings:

```js

Backbone.View.extend({
    render: function() {
        this.model.changed = false;
    }
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    render: function() {
        if (this.model.changed) {
            ...
        }
    }
});

```

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Model-changed)
