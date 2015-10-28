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

## Options

This rule accepts an array of strings that would be excluded from the check. For example, if you use `tagName` or `className` properties in your Views and would like them to be declared before `events`, you can enable this rule with the following options:

```json

"rules" : {
    "backbone/events-on-top": [1, ["tagName", "className"]],
    ...
}

```

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#View)
