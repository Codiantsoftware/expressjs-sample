const {
  envHelper: { getEnvVariable },
} = require('../src/helpers');

const database = {
  host: getEnvVariable('DB_HOST'),
  port: getEnvVariable('DB_PORT'),
  username: getEnvVariable('DB_USER'),
  password: getEnvVariable('DB_PASSWORD'),
  db: getEnvVariable('DB_NAME'),
  timezone: '+00:00',
};
module.exports = database;
