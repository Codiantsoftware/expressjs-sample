const bcrypt = require('bcryptjs');

const saltRounds = 10; // Number of salt rounds for bcryptjs

/**
 * Hashes the provided password using bcryptjs with a generated salt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

/**
 * Compares a plain-text password with a hashed password using bcryptjs's compare method.
 * @param {string} password - The plain-text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
async function comparePasswords(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

module.exports = { hashPassword, comparePasswords };
