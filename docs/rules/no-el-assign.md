# Prevent assigning el or $el inside views (no-el-assign)

Setting `this.el` or `this.$el` can cause issues, since Backbone will not automatically bind events to the element. Use `setElement` function instead which will cache a reference to an element and bind all events.

## Rule Details

The following patterns are considered warnings:

```js

Backbone.View.extend({
    initialize: function() {
        this.$el = $(".test");
    }
});

Backbone.View.extend({
    initialize: function() {
        this.el = $(".test")[0];
    }
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    initialize: function() {
        this.setElement($(".test"));
    }
});

```

## When Not To Use It

If you always call `delegateEvents` manually, you can still set this.el directly.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#View-setElement)
