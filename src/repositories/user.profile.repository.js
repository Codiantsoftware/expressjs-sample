const BaseRepository = require('./base.repository');

const userProfileRepository = new BaseRepository('UserProfile');

/**
 * Saves a user profile to the database.
 *
 * @param {Object} profileData - The data for the user profile to be saved.
 * @return {Promise<Object>} The saved user profile object.
 * @throws {Error} If there is an error saving the user profile.
 */
const create = async (profileData, transaction = null) => {
  try {
    const { firstName, lastName, phoneNumber, userId } = profileData;
    return await userProfileRepository.create({ firstName, lastName, phoneNumber, userId }, transaction);
  } catch ({ message }) {
    throw new Error(`Error saving user profile: ${message}`);
  }
};

/**
 * Updates a user profile in the database.
 *
 * @param {number} userProfileId - The ID of the user profile to be updated.
 * @param {Object} updatedProfileData - The data to update the user profile with.
 * @return {Promise<Object>} The updated user profile object.
 * @throws {Error} If there is an error updating the user profile.
 */
const update = async (userProfileId, updatedProfileData) => {
  try {
    return await userProfileRepository.update(userProfileId, updatedProfileData);
  } catch (err) {
    throw new Error(`Failed to update user profile: ${err.message}`);
  }
};

module.exports = {
  create,
  update,
};
