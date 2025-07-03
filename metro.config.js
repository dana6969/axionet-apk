const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  Graph: path.resolve(__dirname, 'Graph')
};

module.exports = config;
