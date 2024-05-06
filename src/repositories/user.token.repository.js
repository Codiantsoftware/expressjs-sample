const BaseRepository = require('./base.repository');

const userTokenRepository = new BaseRepository('UserToken');

/**
 * Saves a user token to the database.
 *
 * @param {Object} tokenData - The data for the user token to be saved.
 *   Should contain at least the `userId` and `token` properties.
 * @property {number} tokenData.userId - The ID of the user.
 * @property {string} tokenData.token - The token for the user.
 * @return {Promise<Object>} The saved user token object.
 * @throws {Error} If there is an error saving the user token.
 */
const create = async (tokenData, transaction = null) => {
  try {
    const { userId, token, deviceType, deviceId, deviceToken } = tokenData;

    return await userTokenRepository.create({ userId, token, deviceType, deviceId, deviceToken }, transaction);
  } catch ({ message }) {
    throw new Error(`Error saving user token: ${message}`);
  }
};

/**
 * Updates a user token in the database.
 *
 * @param {number} tokenId - The ID of the user token to be updated.
 * @param {Object} updatedTokenData - The data to update the user token with.
 * @property {number} [updatedTokenData.userId] - The ID of the user.
 * @property {string} [updatedTokenData.token] - The token for the user.
 * @return {Promise<Object>} The updated user token object.
 * @throws {Error} If there is an error updating the user token.
 */
const update = async (tokenId, updatedTokenData) => {
  try {
    const { userId, token } = updatedTokenData;
    return await userTokenRepository.update(tokenId, { userId, token });
  } catch (err) {
    throw new Error(`Failed to update user token: ${err.message}`);
  }
};

/**
 * Finds a user token by user ID and token.
 *
 * @param {number} userId - The ID of the user.
 * @param {string} token - The token for the user.
 * @return {Promise<Object>} The user token object, if found.
 * @throws {Error} If there is an error finding the user token.
 */
const findByUserIdAndToken = async (userId, token) => {
  try {
    return await userTokenRepository.findOne({
      where: { userId, token },
    });
  } catch (err) {
    throw new Error(`Failed to find user token: ${err.message}`);
  }
};

module.exports = {
  create,
  update,
  findByUserIdAndToken,
};
