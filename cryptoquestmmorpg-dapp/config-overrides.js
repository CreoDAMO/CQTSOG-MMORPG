const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
  alias(configPaths('./tsconfig.paths.json'))(config);
  return config;
};
