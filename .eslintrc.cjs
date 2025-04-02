const prettierConfig = require('./.prettierrc.cjs');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'prettier', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)',
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    semi: [
      'error',
      'always',
      { omitLastInOneLineBlock: true, omitLastInOneLineClassBody: true },
    ],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': ['error', prettierConfig],
    '@typescript-eslint/no-explicit-any': 'off', 
  },
}
