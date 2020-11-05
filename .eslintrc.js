module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  rules: {
    // quotes: [2, 'single', { avoidEscape: true }],
    'max-len': ['error', { code: 160, ignoreUrls: true, ignoreTemplateLiterals: true }],
    'no-param-reassign': ['error', { props: false }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    indent: 'off',
    'no-trailing-spaces': 'off',
    'object-curly-spacing': 'off',
    'comma-dangle': 'off',
    'quotes':'off',
    'quote-props':'off',
    'react/prop-types':'off',
    'prefer-destructuring':'off',
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

};
