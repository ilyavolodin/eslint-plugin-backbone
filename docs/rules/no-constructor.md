# Prevent overloading of constructor (no-constructor)

Backbone Models, Views and Collections use `constructor` method to instantiate themselves. Overloading it might lead to unexpected results. When overloading `constructor`, you should always call base. In most cases it's easier to overload `initialize` method, which will be executed when Model, View or Collection is created.

## Rule Details

The following patterns are considered warnings:

```js

Backbone.Model.extend({
	constructor: function() {
		...
	}
});

```

The following patterns are not warnings:

```js

Backbone.Model.extend({
	initialize: function() {
		 ...
	}
});

```

## When Not To Use It

If you are creating your own wrapper around Model, View or Collection, it's probably better to overload `constructor`. So this rule should be disabled for those files.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#Model-constructor)
