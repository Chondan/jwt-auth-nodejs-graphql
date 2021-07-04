module.exports = {
  extends: [
    '../.eslintrc.js',
    'react-app',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'react/jsx-indent': [2, 4, { checkAttributes: true }],
    'react/jsx-use/react': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/button-has-type': 'off',
    'max-len': ['error', { code: 130 }],
    'react/prop-types': 'off',
  },
  ignorePatterns: ['src/graphql/generated/*'],
};
