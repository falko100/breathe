module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'eslint:recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  globals: {
    alert: 'readonly',
    HTMLAudioElement: 'readonly',
    Audio: 'readonly',
    React: 'readonly',
    JSX: 'readonly',
    navigator: 'readonly',
    MediaMetadata: 'readonly',
    NodeJS: 'readonly',
  }
}
