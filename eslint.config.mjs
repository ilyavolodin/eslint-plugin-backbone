/** @author https://github.com/miyasudokoro */

import { defineConfig } from "eslint/config";
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default defineConfig( [
    js.configs.recommended,
    jsdoc.configs[ 'flat/recommended' ],
    {
        'plugins': {
            '@stylistic': stylistic
        },
        'ignores': [
            'node_modules/**',
            'build/**'
        ],
        'languageOptions': {
            'ecmaVersion': 'latest',
            'sourceType': 'commonjs',
            'globals': {
                ...globals.node
            }
        },
        'rules': {
            '@stylistic/brace-style': [
                2,
                '1tbs'
            ],
            'default-case': 2,
            'func-style': [
                2,
                'declaration'
            ],
            'guard-for-in': 2,
            '@stylistic/no-floating-decimal': 2,
            'no-nested-ternary': 2,
            'no-undefined': 2,
            'radix': 2,
            '@stylistic/keyword-spacing': 2,
            '@stylistic/no-multi-spaces': 2,
            '@stylistic/wrap-iife': 2,
            '@stylistic/semi': 2
        }
    },
    {
        'files': [ '**/*.mjs' ],
        'languageOptions': {
            'ecmaVersion': 'latest',
            'sourceType': 'module',
            'globals': {
                ...globals.node
            }
        }
    }
] );
