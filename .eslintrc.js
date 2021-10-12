// module.exports = {
//   env: {
//     browser: true,
//     node: true,
//   },
//   parser: 'vue-eslint-parser',
//   parserOptions: {
//     parser: '@typescript-eslint/parser',
//     sourceType: 'module',
//     ecmaVersion: 10,
//   },
//   plugins: ['@typescript-eslint', 'prettier'],
//   extends: [
//     'eslint:recommended',
//     'plugin:vue/vue3-recommended',
//     'plugin:@typescript-eslint/recommended',
//   ],
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     quotes: ['error', 'single'],
//     semi: ['error', 'never'],
//     'no-unused-vars': 'off',
//     '@typescript-eslint/no-unused-vars': 'off',
//   },
// }

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 10,
  },
  rules: {
    'vue/valid-template-root': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/one-component-per-file': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
