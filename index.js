"use strict";

module.exports = {
    rules: {
        "collection-model": require("./lib/rules/collection-model"),
        "defaults-on-top": require("./lib/rules/defaults-on-top"),
        "events-on-top": require("./lib/rules/events-on-top"),
        "model-defaults": require("./lib/rules/model-defaults"),
        "no-changed-set": require("./lib/rules/no-changed-set"),
        "no-collection-models": require("./lib/rules/no-collection-models"),
        "no-constructor": require("./lib/rules/no-constructor"),
        "no-el-assign": require("./lib/rules/no-el-assign"),
        "no-model-attributes": require("./lib/rules/no-model-attributes"),
        "no-native-jquery": require("./lib/rules/no-native-jquery"),
        "no-view-collection-models": require("./lib/rules/no-view-collection-models"),
        "no-view-model-attributes": require("./lib/rules/no-view-model-attributes")
    }
};
