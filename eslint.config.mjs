import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress/flat'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  {
    ignores: [
      './node_modules',
      './.DS_Store',
    ]
  }
];