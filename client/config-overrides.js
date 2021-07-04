/* eslint-disable import/no-extraneous-dependencies */
const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@src': 'src/',
    '@components': 'src/components',
    '@pages': 'src/pages',
    '@graphql': 'src/graphql',
  })(config);
  return config;
};
