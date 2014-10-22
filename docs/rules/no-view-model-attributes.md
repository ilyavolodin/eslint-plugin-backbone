# Prevent access to model's attributes collection inside views (no-view-model-attributes)

Instead of accessing `attributes` collection directly from within views, use `get()` or `set()` functions. Backbone setters do more then just assign value, they also keep track of when model has been last modified. If you work with `attributes` collection directly, `changed` and `changedAttributes` will not be updated.


## Rule Details

The following patterns are considered warnings:

```js

Backbone.View.extend({
    render: function() {
        alert(this.model.attributes[0]);
    }
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    render: function() {
        alert(this.model.get("test"));
    }
});

```

## When Not To Use It

If your models are configured as input to templates and you use them that way, this rule will flag any time you pass attributes collection to the template.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Model-get)
