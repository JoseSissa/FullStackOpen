import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        languageOptions: { globals: {
            ...globals.browser,
            ...globals.node,
        } },
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error",
            '@stylistic/js/indent': ['error', 4],
            'arrow-spacing': "error"
        },
        ignores: ['node_modules', 'dist', 'build', '.git', '.next', '.astro'],
    },
    pluginJs.configs.recommended,
];