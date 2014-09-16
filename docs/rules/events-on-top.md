# Events should be the first thing registered in the View (events-on-top)

If events are declared on the view, they should be declared as the very first thing to improve readability and findability of the code.


## Rule Details

The following patterns are considered warnings:

```js
Backbone.View.extend({
    initialize: function() {
        ...
    },
    events: {}
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    events: {},
    initialize: function() {
        ...
    }
});

```

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#View)
