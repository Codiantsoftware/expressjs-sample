const userRepository = require('./user.repository');
const roleRepository = require('./role.repository');
const userRoleRepository = require('./user.role.repository');
const userTokenRepository = require('./user.token.repository');
const userProfileRepository = require('./user.profile.repository');

module.exports = {
  userRepository,
  roleRepository,
  userRoleRepository,
  userTokenRepository,
  userProfileRepository,
};
