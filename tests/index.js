/** @author https://github.com/miyasudokoro */

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert");
const index = require("../index.js");

test("index",() => {
    assert(index.meta.name === "backbone");
    assert(!!index.rules);
    assert(!!index.configs.recommended.rules);
    assert(index.configs.recommended.plugins.backbone === index);
    assert(index.configs.recommended.languageOptions.globals.Backbone === 'readonly');
    assert(index.configs.recommended.languageOptions.globals._ === 'readonly');
});

const loc = path.join(__dirname, "lib", "rules");
const rules = fs.readdirSync(loc);
for (const rule of rules ) {
    if (rule !== "index.js") {
        test(rule, () => {
            require(path.join(loc,rule));
            const name = rule.replace('.js', '');
            assert(!!index.rules[name], 'No entry for rules.'+name+' in index');
            assert(typeof index.configs.recommended.rules['backbone/'+name] !== 'undefined', 'No entry for recommended.rules.backbone/'+name+' in index');
        });
    }
}
