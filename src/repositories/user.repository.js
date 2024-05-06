const BaseRepository = require('./base.repository');
const userRoleRepository = require('./user.role.repository');
const userTokenRepository = require('./user.token.repository');

const userRepository = new BaseRepository('User');

/**
 * Creates a new user in the database.
 *
 * @param {Object} data - The data to create the user with.
 * @property {string} data.email - The email of the user.
 * @property {string} data.password - The password of the user.
 * @returns {Promise<Object>} - The created user.
 * @throws {Error} - If there is an error while creating the user.
 */
const create = async (data, transaction = null) => {
  try {
    return await userRepository.create(data, transaction);
  } catch (error) {
    throw new Error(`Error saving user: ${error.message}`);
  }
};

/**
 * Updates a user in the database.
 *
 * @param {number} id - The ID of the user to update.
 * @param {Object} newData - The data to update the user with.
 * @property {string} [newData.email] - The new email of the user.
 * @property {string} [newData.password] - The new password of the user.
 * @returns {Promise<Object>} - The updated user.
 * @throws {Error} - If there is an error while updating the user.
 */
const update = async (id, newData) => {
  try {
    return await userRepository.update(id, newData);
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

/**
 * Retrieves a user from the database using the provided 'where' clause.
 *
 * @param {object} where - The criteria to match against a user.
 * @return {Promise<Object>} - The user object that matches the criteria,
 *   or null if no match is found.
 * @throws {Error} If there is an error while retrieving the user.
 */
const findOne = async (where) => {
  try {
    return await userRepository.findOne(where);
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array>} - The array of users.
 * @throws {Error} - If there is an error while retrieving the users.
 */
const findAll = async () => {
  try {
    return await userRepository.getAll();
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

/**
 * Deletes a user from the database by their ID.
 *
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 * @throws {Error} - If there is an error while deleting the user.
 */
const destroy = async (id) => {
  try {
    await userRepository.delete(id);
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

/**
 * Assigns a role to a user.
 *
 * @param {Object} params - The parameters for the assignment.
 * @param {number} params.userId - The ID of the user.
 * @param {number} params.roleId - The ID of the role.
 * @returns {Promise<Object>} - The created role assignment.
 * @throws {Error} - If there is an error while assigning the role.
 */
const assignUserRole = async ({ userId, roleId }, transaction = null) => {
  try {
    return await userRoleRepository.create({ userId, roleId }, transaction);
  } catch (error) {
    throw new Error(`Failed to assign user role: ${error.message}`);
  }
};

/**
 * Assigns a token to a user.
 *
 * @param {Object} params - The parameters for the assignment.
 * @param {number} params.userId - The ID of the user.
 * @param {string} params.token - The token to assign to the user.
 * @returns {Promise<Object>} - The created token assignment.
 * @throws {Error} - If there is an error while assigning the token.
 */
const assignTokenToUser = async ({ userId, token, deviceType, deviceId, deviceToken }) => {
  try {
    return await userTokenRepository.create({ userId, token, deviceType, deviceId, deviceToken });
  } catch ({ message }) {
    throw new Error(`Failed to assign token to user: ${message}`);
  }
};

/**
 * Check if an email exists in the user repository.
 *
 * @param {string} email - The email to check.
 * @return {Promise<boolean>} - A promise that resolves to true if the email exists,
 *                             false otherwise.
 * @throws {Error} - If there is an error while checking the email.
 */
const checkEmailExists = async (email) => {
  try {
    const user = await userRepository.findOne(email, ['id', 'email']);
    return Boolean(user);
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

module.exports = {
  create,
  update,
  findOne,
  findAll,
  destroy,
  assignUserRole,
  assignTokenToUser,
  checkEmailExists,
};
