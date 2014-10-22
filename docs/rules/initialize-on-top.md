# Requires initialize to be the first property of Backbone Views/Models/Collections (initialize-on-top)

Initialize is usally the first method that is executed when you instantiate a View, Model or Collection. As such, declaring it at the top improves readability and creates an easier to understand context for the rest of the class.

## Rule Details

The following patterns are considered warnings:

```js

Backbone.View.extend({
    render: function() {},
    initialize: function() {}
});

```

The following patterns are not warnings:

```js

Backbone.View.extend({
    initialize: function() {},
    render: function() {}
});

```

### Options

You can supply a list of options that would specify properties that you would like to exclude from the rule and allow to be placed above the initialize method:

```json

"rules" : {
    "backbone/initialize-on-top": [1, { View: ["tagName", "className", "events"], Model: ["defaults"], Collection: ["model"] }],
    ...
}

```

## Further Reading

* [BackboneJS Documentation Models](http://backbonejs.org/#Model-constructor)
* [BackboneJS Documentation Views](http://backbonejs.org/#View-constructor)
* [BackboneJS Documentation Collections](http://backbonejs.org/#Collection-constructor)