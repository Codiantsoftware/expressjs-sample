const {
  envHelper: { getEnvVariable },
} = require('../src/helpers');

const config = {
  name: getEnvVariable('APP_NAME'),
  port: getEnvVariable('APP_PORT', 3000),
  baseUrl:getEnvVariable('BASE_URL')
};
module.exports = config;
