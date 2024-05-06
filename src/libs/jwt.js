const jsonWebToken = require("jsonwebtoken");
const {
  jwt: { jwtSecret, jwtExpireIn }
} = require("../../config");

/**
 * Generates a JWT token with the provided payload.
 * @param {object} payload The payload to be included in the JWT token.
 * @returns {string} The generated JWT token.
 */
function generateToken(payload) {  
  return jsonWebToken.sign(payload, jwtSecret, { expiresIn:jwtExpireIn });
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {string} token The JWT token to verify.
 * @returns {object|null} The decoded payload if the token is valid, or null if verification fails.
 */
function verifyToken(token) {
  try {
    return jsonWebToken.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

/**
 * Decodes a JWT token without verifying it.
 * @param {string} token The JWT token to decode.
 * @returns {object|null} The decoded payload if the token is syntactically valid, or null if decoding fails.
 */
function decodeToken(token) {
  return jsonWebToken.decode(token);
}

module.exports = { generateToken, verifyToken, decodeToken };
