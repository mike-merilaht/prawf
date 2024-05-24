import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';
// import jsdoc from 'eslint-plugin-jsdoc';

export default [
  { languageOptions: { globals: globals.node } },
  // jsdoc.configs['flat/recommended'],
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      // jsdoc,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      'no-unused-vars': 'error',
      'no-undef': 'warn',
      quotes: ['error', 'single'],
      'max-len': 'error',
    },
  },
];
