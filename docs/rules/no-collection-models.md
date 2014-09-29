# Prevent access to models property of collections (no-collection-models)

Instead of accessing `models` collection directly from within views, use `get()`, `at()` or underscore functions. If you are looking for length of the collection, use `this.length` instead. If you want to modify collection use `this.add`, `this.remove`, `this.push` and `this.pop` methods instead.


## Rule Details

The following patterns are considered warnings:

```js

Backbone.Collection.extend({
    initialize: function() {
        _.first(this.models);
    }
});

```

The following patterns are not warnings:

```js

Backbone.Collection.extend({
    initialize: function() {
        this.at(0);
    }
});

```

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Collection-models)

## Related Rules

[no-view-collection-models](no-view-collection-models.md)
