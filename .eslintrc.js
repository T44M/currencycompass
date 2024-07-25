module.exports = {
    extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
    plugins: ['react', 'jest'],
    env: {
      browser: true,
      es2021: true,
      jest: true,
      node: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };