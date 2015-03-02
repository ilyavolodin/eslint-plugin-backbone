# Prevent using on/off bindings inside views (no-view-onoff-binding)

Instead of using `on` and `off` methods to subscribe to model/collection events, use `listenTo` and `stopListening` methods.
If you remove a view that uses `on` binding to the model events, view is not completely removed from the memory, because
model still has reference to event handler function that lives inside the view. This can be avoided by using `off` before
removing a view. Or by using `listenTo` function.


## Rule Details

The following patterns are considered warnings:

```js

Backbone.View.extend({
    initalize: function() {
        this.model.on("change", this.render);
    }
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    }
});

```

## When Not To Use It

If you destroy your models more often then you destroy your views, then you should use `on` method instead of `listenTo`.
Or if you always use `off` method before destroying the view.


## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Events-listenTo)
