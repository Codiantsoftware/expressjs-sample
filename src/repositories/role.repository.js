const BaseRepository = require('./base.repository');

const roleRepository = new BaseRepository('Role');

/**
 * Saves a role to the database.
 *
 * @param {Object} roleData - The data for the role to be saved.
 * @return {Promise<Object>} The saved role object.
 * @throws {Error} If there is an error saving the role.
 */
const create = async (roleData, transaction = null) => {
  try {
    return await roleRepository.create(roleData, transaction);
  } catch ({ message }) {
    throw new Error(`Error saving role: ${message}`);
  }
};

/**
 * Updates a role in the database.
 *
 * @param {number} roleId - The ID of the role to be updated.
 * @param {Object} updatedRoleData - The data to update the role with.
 * @return {Promise<Object>} The updated role object.
 * @throws {Error} If there is an error updating the role.
 */
const update = async (roleId, updatedRoleData) => {
  try {
    return await roleRepository.update(roleId, updatedRoleData);
  } catch (err) {
    throw new Error(`Failed to update role: ${err.message}`);
  }
};

module.exports = {
  create,
  update,
};
