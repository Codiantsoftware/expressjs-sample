const {
  envHelper: { getEnvVariable },
} = require('../src/helpers');

const jwt = {
  jwtSecret: getEnvVariable('JWT_SECRET'),
  jwtExpireIn: getEnvVariable('JWT_EXPIRE_IN'),
};
module.exports = jwt;
