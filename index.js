"use strict";

module.exports = {
    rules: {
        "collection-model": require("./lib/rules/collection-model"),
        "defaults-on-top": require("./lib/rules/defaults-on-top"),
        "events-on-top": require("./lib/rules/events-on-top"),
        "model-defaults": require("./lib/rules/model-defaults"),
        "no-constructor": require("./lib/rules/no-constructor"),
        "no-el-assign": require("./lib/rules/no-el-assign"),
        "no-native-jquery": require("./lib/rules/no-native-jquery")
    }
};
