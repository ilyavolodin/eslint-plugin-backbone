# Verify that scope is passed into event handlers (event-scope)

When binding event handlers to Backbone events such as `add`, `remove`, etc. it's a good idea to pass third parameter that will switch context. While, sometimes it's not necessary, in most cases it will make your code more predictable and easier to understand. This rule applies to `on` and `once` operators.

## Rule Details

The following patterns are considered warnings:

```js

Backbone.Model.extend({
    initialize: function() {
        this.on('change', this.modelChanged); 
    }
});

```

The following patterns are not warnings:

```js

Backbone.Model.extend({
    initialize: function() {
        this.on('change', this.modelChanged, this);
    }
});

```

## When Not To Use It

If you want context to be changed to the object that triggered this event, you will need to disable this rule.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Events-on)
