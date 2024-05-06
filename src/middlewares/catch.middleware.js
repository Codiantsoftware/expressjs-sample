/**
 * Wraps an async function to catch any errors and pass them to the next middleware.
 *
 * @param {Function} fn - The async function to be executed
 * @return {Function} A middleware function that catches errors and passes them to the next middleware
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
