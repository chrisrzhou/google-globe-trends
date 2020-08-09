module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
