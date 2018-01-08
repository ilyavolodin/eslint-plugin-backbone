# Prevent usage of global $ to reach view elements (no-view-qualified-jquery)

When operating on Backbone views outside of other Backbone contexts, it is easy to forget that views provide their own functions for accessing elements. These functions should be favored because the jQuery selector scope is limited to the view's root element automatically.

## Rule Details

The following patterns are considered warnings:

```js
/* eslint backbone/no-view-qualified-jquery: 2 */

$('.some-selector', view.el);

$('.some-selector', view.$el);

$('.some-selector', $(view.el));

$('.some-selector', $(view.$el));

jQuery('.some-selector', view.el);

jQuery('.some-selector', view.$el);

jQuery('.some-selector', jQuery(view.el));

jQuery('.some-selector', jQuery(view.$el));

$('.some-selector', myView.el);

$('.some-selector', myView.$el);

$('.some-selector', $(myView.el));

$('.some-selector', $(myView.$el));

```

With the `identifiers` option configured to a different value, the following patterns are considered warnings:

```js
/* eslint backbone/no-view-qualified-jquery: [2, { identifiers: ["myJQuery"] }] */

myJQuery('.some-selector', myView.el);

myJQuery('.some-selector', myView.$el);

myJQuery('.some-selector', myJQuery(myView.el));

myJQuery('.some-selector', myJQuery(myView.$el));

```

With the `identifiers` option configured to a different value, the following pattern is not considered a warning:

```js
/* eslint backbone/no-view-qualified-jquery: [2, { identifiers: ["myJQuery"] }] */

$('.some-selector', view.el);

```

## Options

This rule supports a single options object. The options object can have one option: `identifiers`. This represents what global identifiers represent the jQuery library and is set to `["$", "jQuery"]` by default. However, if you use `jQuery.noConflict()` or AMD to set jQuery to use a different global, you can specify that in the options object. Note that you must provide an array of identifiers.

## When Not To Use It

If this rule results in too many false positives, it can be safely disabled.

## Further Reading

[BackboneJS Documentation](http://backbonejs.org/#View-dollar)
