module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  'plugins': [
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'strict': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
