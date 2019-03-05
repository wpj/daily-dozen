const flatten = require('lodash.flatten');

module.exports = api => {
  const isTest = api.env('test');
  const isProd = api.env('production');

  const plugins = flatten([
    isProd
      ? [['react-remove-properties', { properties: ['data-testid'] }]]
      : null,
  ]).filter(Boolean);

  const presets = flatten([
    'babel-preset-gatsby',
    isTest ? ['@babel/preset-typescript'] : null,
  ]).filter(Boolean);

  return {
    plugins,
    presets,
  };
};
