module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-underscore-dangle': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'no-unneeded-ternary': 'warn',
    '@typescript-eslint/naming-convention': [
      'off',
      {
        leadingUnderscore: 'allow',
      },
    ],
  },
  env: {
    jasmine: true,
    jest: true,
  },
};
