[![Build Status](https://travis-ci.org/ilyavolodin/eslint-plugin-backbone.svg)](http://travis-ci.org/ilyavolodin/eslint-plugin-backbone)

eslint-plugin-backbone
======================

[Backbone](http://backbonejs.org) specific linting rules for [ESLint](http://www.eslint.org)

#How to use

## Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally

```bash

npm install eslint@">=0.8.2"

or

npm install eslint@">=0.8.2" --save-dev
```

eslint-plugin-backbone requires `ESLint` with version greater then 0.8.1 or 0.8.2 if you would like to use your own base models.

## Install Backbone plugins.
If you installed `ESLint` globally, you have to install Backbone plugin globally too. Otherwise, install it locally.

```bash

npm install eslint-plugin-backbone

or

npm install eslint-plugin-backbone --save-dev
```

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
* [render-return](docs/rules/render-return.md)