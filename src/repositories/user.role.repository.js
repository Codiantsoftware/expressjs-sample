const BaseRepository = require('./base.repository');

const userRoleRepository = new BaseRepository('UserRole');

/**
 * Saves a user role to the database.
 *
 * @param {Object} roleData - The data for the user role to be saved.
 * @return {Promise<Object>} The saved user role object.
 * @throws {Error} If there is an error saving the user role.
 */
const create = async (roleData, transaction = null) => {
  try {
    const { userId, roleId } = roleData;
    return await userRoleRepository.create({ userId, roleId }, transaction);
  } catch ({ message }) {
    throw new Error(`Error saving user role: ${message}`);
  }
};

/**
 * Updates a user role in the database.
 *
 * @param {number} userRoleId - The ID of the user role to be updated.
 * @param {Object} updatedRoleData - The data to update the user role with.
 * @return {Promise<Object>} The updated user role object.
 * @throws {Error} If there is an error updating the user role.
 */
const update = async (userRoleId, updatedRoleData) => {
  try {
    return await userRoleRepository.update(userRoleId, updatedRoleData);
  } catch (err) {
    throw new Error(`Failed to update user role: ${err.message}`);
  }
};

module.exports = {
  create,
  update,
};
