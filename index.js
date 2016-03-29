"use strict";

module.exports = {
    rules: {
        "collection-model": require("./lib/rules/collection-model"),
        "defaults-on-top": require("./lib/rules/defaults-on-top"),
        "event-scope": require("./lib/rules/event-scope"),
        "events-on-top": require("./lib/rules/events-on-top"),
        "initialize-on-top": require("./lib/rules/initialize-on-top"),
        "model-defaults": require("./lib/rules/model-defaults"),
        "no-changed-set": require("./lib/rules/no-changed-set"),
        "no-collection-models": require("./lib/rules/no-collection-models"),
        "no-constructor": require("./lib/rules/no-constructor"),
        "no-el-assign": require("./lib/rules/no-el-assign"),
        "no-model-attributes": require("./lib/rules/no-model-attributes"),
        "no-native-jquery": require("./lib/rules/no-native-jquery"),
        "no-silent": require("./lib/rules/no-silent"),
        "no-view-collection-models": require("./lib/rules/no-view-collection-models"),
        "no-view-model-attributes": require("./lib/rules/no-view-model-attributes"),
        "no-view-onoff-binding": require("./lib/rules/no-view-onoff-binding"),
        "no-view-qualified-jquery": require("./lib/rules/no-view-qualified-jquery"),
        "render-return": require("./lib/rules/render-return")
    },
    configs: {
        recommended: {
            env: {
                browser: true
            },
            globals: {
                "Backbone": false,
                "_": false
            },
            plugins: [
                "backbone"
            ],
            rules: {
                "backbone/collection-model": 2,
                "backbone/defaults-on-top": 1,
                "backbone/event-scope": 1,
                "backbone/events-on-top": [1, ["tagName", "className"]],
                "backbone/initialize-on-top": [1, { View: ["tagName", "className", "events"], Model: ["defaults", "url", "urlRoot"], Collection: ["model", "url"] }],
                "backbone/model-defaults": 2,
                "backbone/no-changed-set": 2,
                "backbone/no-collection-models": 2,
                "backbone/no-constructor": 1,
                "backbone/no-el-assign": 2,
                "backbone/no-model-attributes": 2,
                "backbone/no-native-jquery": [1, "selector"],
                "backbone/no-silent": 1,
                "backbone/no-view-collection-models": 2,
                "backbone/no-view-model-attributes": 2,
                "backbone/no-view-onoff-binding": 2,
                "backbone/no-view-qualified-jquery": 0,
                "backbone/render-return": 2
            }
        }
    }
};
