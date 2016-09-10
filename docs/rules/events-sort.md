# Event names in event hash should be sorted alphabetically (events-sort)

If events are declared on the view, their keys should be sorted alphabetically to improve predictability of the code.


## Rule Details

The following patterns are considered warnings:

```js
Backbone.View.extend({
    events: {
        'submit': 'handleSubmit',
        'click': 'handleClick'
    }
    ...
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    events: {
        'blur': 'handleBlur',
        'click': 'handleClick',
        'submit': 'handleSubmit'
    }
    ...
});

```

## When Not To Use It

When you do not use `events` extensively or your views usually only handle a small number of events.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#View)
