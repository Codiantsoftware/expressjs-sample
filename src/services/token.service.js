const { jwt } = require("../libs");

/**
 * Generates a token based on the provided payload.
 *
 * @param {object} payload - The data to be included in the token.
 * @return {string} The generated token.
 */
const generateToken = (payload) => {
  return jwt.generateToken(payload);
};
/**
 * Verify the authenticity of a token.
 *
 * @param {string} token - The token to be verified.
 * @return {boolean} Whether the token is valid or not.
 */
const verifyToken = (token) => {
  return jwt.verifyToken(token);
};

module.exports = {
  generateToken,
  verifyToken,
};
