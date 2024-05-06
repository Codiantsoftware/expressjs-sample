const { authService } = require('../services');
const { userEventEmitter } = require('../events');

/**
 * Function for logging in a user.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next function to call
 * @return {Object} JSON response
 */
async function login(req, res, next) {
  const { email, password } = req.body;
  userEventEmitter.emit('user.login', { email, password });
  const { user, token } = await authService.checkUserLogin({ email, password });

  res.apiResponse.success('Login successful', { user, token });
}
/**
 * Function to handle user sign up.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware function
 * @return {Object} JSON response
 */
async function signup(req, res, next) {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  const user = await authService.createUser({ email, password, firstName, lastName, phoneNumber });
  userEventEmitter.emit('user.created', user);

  res.apiResponse.success('You have successfully signed up', { user });
}

module.exports = {
  login,
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
  logout,
};
