# Enforces render function to always return this (render-return)

Returning `this` from within `render` function is considered best practice in Backbone.


## Rule Details

The following patterns are considered warnings:

```js

Backbone.View.extend({
    render: function() {

    }
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    render: function() {
        return this;
    }
});

```

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#View-render)
