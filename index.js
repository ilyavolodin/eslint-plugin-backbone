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
        "render-return": require("./lib/rules/render-return")
    },
    rulesConfig: {
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
        "render-return": 2
    }
};
