import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'assets/js/search-data.js']
  },
  {
    files: ['assets/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.browser
      }
    },
    rules: {
      ...js.configs.recommended.rules,

      // These browser scripts share globals across files, so ESLint cannot see every definition or usage.
      'no-undef': 'off',
      'no-unused-vars': 'off'
    }
  }
];