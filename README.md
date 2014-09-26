[![Build Status](https://travis-ci.org/ilyavolodin/eslint-plugin-backbone.svg)](http://travis-ci.org/ilyavolodin/eslint-plugin-backbone)

eslint-plugin-backbone
======================

[Backbone](http://backbonejs.org) specific linting rules for [ESLint](http://www.eslint.org)

#How to use

## Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally

```bash

npm install eslint

or

npm install eslint --save-dev
```

## Install Backbone plugins. If you installed `ESLint` globally, you have to install Backbone plugin globally too. Otherwise, install it locally.

```bash

npm install eslint-plugin-backbone

or

npm install eslint-plugin-backbone --save-dev
```

## Modify .eslintrc for your project

Add `plugins` section and specify eslint-plugin-backbone as a plugin

```json

{
    "plugins": {
        "backbone"
    }
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
        "backbone/no-native-jquery": 1
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
* [events-on-top](docs/rules/events-on-top.md)
* [model-defaults](docs/rules/model-defaults.md)
* [no-constructor](docs/rules/no-constructor.md)
* [no-native-jquery](docs/rules/no-native-jquery.md)
