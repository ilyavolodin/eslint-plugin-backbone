# Prevent using silent option in functions that cause events (no-silent)

Per Backbone documentation, passing `silent` flag is rarely if ever a good idea. A better way is to have your event handler determine if the event needs to be accepted on. This rule applies to the following commands:
`set`, `unset`, `reset`, `clear`, `remove`, `add`, `push`, `unshift`, `shift`, `sort`, `create`

## Rule Details

The following patterns are considered warnings:

```js

Backbone.Model.extend({
    intialize: function() {
        this.set('test', 'test', {silent:true});
    }
});

```

The following patterns are not warnings:

```js

Backbone.Model.extend({
    intialize: function() {
        this.set('test', 'test');
    }
});

```

## When Not To Use It

If you know what you are doing and want your action to trigger no events you might need to disable this rule.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Events-catalog)
