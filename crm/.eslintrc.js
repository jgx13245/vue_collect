module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "camelcase": [1, {"properties": "never"}],
    'semi': ["error", "never"],
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "max-len" : ["error", {code : 300}],
    "object-shorthand": [0],
    'linebreak-style': 'off',
    'prefer-arrow-callback':'off',
    'func-names':'off',
    'array-callback-return':'off',
    'consistent-return':'off',
    'no-unused-expressions':'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
