# Prevent access to collection's models property inside views (no-view-collection-models)

Instead of accessing `models` collection directly from within views, use `get()`, `at()` or underscore functions.

## Rule Details

The following patterns are considered warnings:

```js

Backbone.View.extend({
    render: function() {
        alert(this.model.models.length);
    }
})

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    render: function() {
        alert(this.collection.at(0));
    }
});

```

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Collection-models)
