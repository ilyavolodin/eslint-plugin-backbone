[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

eslint-plugin-backbone
======================

[Backbone](http://backbonejs.org) specific linting rules for [ESLint](http://www.eslint.org)

#How to use

## Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally

```bash

npm install eslint@">=1.0.0"

or

npm install eslint@">=1.0.0" --save-dev
```

eslint-plugin-backbone requires `ESLint` with version greater then 1.0.0 if you would like to use your own base models.

## Install Backbone plugins.
If you installed `ESLint` globally, you have to install Backbone plugin globally too. Otherwise, install it locally.

```bash

npm install eslint-plugin-backbone

or

npm install eslint-plugin-backbone --save-dev
```

## Default configuration

**Deprecated in v2**

**note:** ESLint v2 removed support for default configurations. Please see config below for details.

If you are using ESLint >0.9.0 then this plugin will provide default configuration. If you are fine with defaults, you do not need to update your .eslintrc file.

Defaults are currently set to the following:

```json
    "collection-model": 2,
    "defaults-on-top": 1,
    "event-scope": 1,
    "events-on-top": [1, ["tagName", "className"]],
    "initialize-on-top": [1, { View: ["tagName", "className", "events"], Model: ["defaults", "url", "urlRoot"], Collection: ["model", "url"] }],
    "model-defaults": 2,
    "no-changed-set": 2,
    "no-collection-models": 2,
    "no-constructor": 1,
    "no-el-assign": 2,
    "no-model-attributes": 2,
    "no-native-jquery": [1, "selector"],
    "no-silent": 1,
    "no-view-collection-models": 2,
    "no-view-model-attributes": 2,
    "no-view-onoff-binding": 2,
    "no-view-qualified-jquery": 0,
    "render-return": 2
```

## Configuration

In version 2.0.0 removed support for default configurations for plugins and replaced it with ability for plugins to bundle configs. This plugin include `recommended` 
configuration that you can extend from to enable recommended setup of the rules (see "Default configuration" for the list of enabled rules).

To enable bundled config modify your .eslintrc file to include the following line:

```json
{
    "extends": "plugin:backbone/recommended"
}
```

This will enable all of the rules listed above, as well as add two global variables - `Backbone` and `_`.

## Modify .eslintrc for your project

Add `plugins` section and specify eslint-plugin-backbone as a plugin

```json

{
    "plugins": [
        "backbone"
    ]
}
```

Enable all of the rules that you would like to use

```json

{
    "rules": {
        "backbone/collection-model": 1,
        "backbone/defaults-on-top": 1,
        "backbone/model-defaults": 1,
        "backbone/no-constructor": 1,
        "backbone/no-native-jquery": 1,
        ...
    }
}
```

If you are using custom models/view/collection bases you also have to specify each on in the `settings` section

```json

{
    "settings": {
        "backbone": {
            "Collection": ["Backbone.NestedCollection", "MyCollection"],
            "Model": ["MyBaseModel"],
            "View": ["MyBaseView"]
        }
    }
}
```

#List of supported rules

* [collection-model](docs/rules/collection-model.md)
* [defaults-on-top](docs/rules/defaults-on-top.md)
* [event-scope](docs/rules/event-scope.md)
* [events-on-top](docs/rules/events-on-top.md)
* [initialize-on-top](docs/rules/initialize-on-top.md)
* [model-defaults](docs/rules/model-defaults.md)
* [no-changed-set](/docs/rules/no-changed-set.md)
* [no-collection-models](/docs/rules/no-collection-models.md)
* [no-constructor](docs/rules/no-constructor.md)
* [no-el-assign](docs/rules/no-el-assign.md)
* [no-model-attributes](docs/rules/no-model-attributes.md)
* [no-native-jquery](docs/rules/no-native-jquery.md)
* [no-silent](docs/rules/no-silent.md)
* [no-view-collection-models](docs/rules/no-view-collection-models.md)
* [no-view-model-attributes](docs/rules/no-view-model-attributes.md)
* [no-view-onoff-binding](docs/rules/no-view-onoff-binding.md)
* [no-view-qualified-jquery](docs/rules/no-view-qualified-jquery.md)
* [render-return](docs/rules/render-return.md)

[npm-image]: https://img.shields.io/npm/v/eslint-plugin-backbone.svg?style=flat-square
[npm-url]: https://npmjs.org/package/eslint-plugin-backbone
[travis-image]: https://img.shields.io/travis/ilyavolodin/eslint-plugin-backbone/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/ilyavolodin/eslint-plugin-backbone
