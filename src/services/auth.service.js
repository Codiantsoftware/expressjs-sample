const { userRepository, userTokenRepository, userProfileRepository } = require('../repositories');
const { jwt } = require('../libs');
const { hashPasswordHelper } = require('../helpers');
const { AuthError, ApiError } = require('../errors');
const { sequelize } = require('../models');

/**
 * Creates a new user in the database.
 *
 * @param {Object} user - An object containing the email, password, first name, last name and phone number of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} user.firstName - The first name of the user.
 * @param {string} user.lastName - The last name of the user.
 * @param {string} user.phoneNumber - The phone number of the user.
 * @return {Promise<Object>} A Promise that resolves to the newly created user object.
 * @throws {ApiError} If the email already exists.
 */
const createUser = async ({ email, password, firstName, lastName, phoneNumber }) => {
  const transaction = await sequelize.transaction();
  try {
    const isEmailExists = await userRepository.checkEmailExists({ email });
    if (isEmailExists) {
      throw new ApiError('Email already exists');
    }

    const hashedPassword = await hashPasswordHelper.hashPassword(password);
    const createdUser = await userRepository.create({ email, password: hashedPassword }, transaction);
    await userRepository.assignUserRole({ userId: createdUser.id, roleId: 30 }, transaction);
    await userProfileRepository.create({ firstName, lastName, phoneNumber, userId: createdUser.id }, transaction);
    await transaction.commit();

    return createdUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Checks the user login credentials and returns the user and auth token if valid.
 *
 * @param {Object} userData - The user login credentials.
 * @param {string} userData.email - The user email.
 * @param {string} userData.password - The user password.
 * @return {Promise<Object>} The user and auth token if the login is valid.
 * @throws {Error} If the user is not found or the password is invalid.
 */
const checkUserLogin = async ({ email, password }) => {
  const dbUser = await userRepository.findOne({ email });

  if (!dbUser) {
    throw new AuthError('Invalid email or password');
  }

  const isPasswordValid = await hashPasswordHelper.comparePasswords(password, dbUser.password);

  if (!isPasswordValid) {
    throw new AuthError('Invalid email or password');
  }

  const authToken = jwt.generateToken({ id: dbUser.id });

  await userRepository.assignTokenToUser({
    userId: dbUser.id,
    token: authToken,
    deviceType: 'Web',
    deviceId: '123',
    deviceToken: '123',
  });

  return { user: dbUser, token: authToken };
};

/**
 * Verifies a given token and returns the user token if valid.
 *
 * @param {string} token - The token to be verified.
 * @return {Promise<Object>} The user token object if the token is valid.
 * @throws {Error} If the token is invalid.
 */
const verifyToken = (token) => {
  const decodedToken = jwt.verifyToken(token);

  const userToken = userTokenRepository.findByUserIdAndToken(decodedToken.id, token);

  if (!userToken) {
    throw new Error('Invalid token');
  }

  return userToken;
};

module.exports = { createUser, checkUserLogin, verifyToken };
