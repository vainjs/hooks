import config from '@vainjs/eslint-config'

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
]
