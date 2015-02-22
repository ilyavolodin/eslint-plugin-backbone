# Prevent usage of $ in the views (no-native-jquery)

When operating on DOM inside views, you should use this.$ instead of native jQuery. This will limit the scope to the elements to the children of view's element. Views should not operate on DOM outside of it's area of responsibilities. This will lead to confusion and will make a large code base hard to debug.

## Rule Details

The following patterns are considered warnings:

```js

Backbone.View.extend({
    render: function() {
        var a = $(".test").offset();
    }
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    render: function() {
        var a = this.$(".test").offset();
    }
});

```

## Options

This rule supports two modes `all` or `selector`. `all` is the default mode, when on, it will check for any uses of jQuery
in the view. `selector` will only warn about jQuery selectors that are using literals, as in, if you are passing a string
into jQuery's `$` function, it will warn you, but if you are passing an object, it will skip over it. `selector` mode is
useful if you are working with event handlers and need to wrap event's target into jQuery object.

## When Not To Use It

When writing a small application sometimes it's easier to operate on external elements, instead of creating a new view.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#View-dollar)
