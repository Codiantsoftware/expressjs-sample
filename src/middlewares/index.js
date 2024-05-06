const authMiddleware = require('./auth.middleware');
const validateMiddleware = require('./validate.middleware');
const catchMiddleware = require('./catch.middleware');
const apiResponseMiddleware = require('./response.middleware');

module.exports = {
  authMiddleware,
  validateMiddleware,
  catchMiddleware,
  apiResponseMiddleware,
};
