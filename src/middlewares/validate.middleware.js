const Joi = require('joi');
const {
  utilsHelper: { pick },
} = require('../helpers');

/**
 * Middleware for validating JSON object schema requests
 * @param {Object} schema - Joi schema object
 * @returns {function} - Middleware function
 */
const validate = (schema) => async (req, res, next) => {
  try {
    const validSchema = pick(schema, ['headers', 'params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));

    const { error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errors = [];

      error.details.forEach((errorData) => {
        const pathLength = errorData?.path?.length ?? 0;
        if (Array.isArray(errorData.path) && pathLength > 0) {
          let field = errorData.path[0];
          if (pathLength > 1) {
            field = errorData.path[1];
          }
          const errorObject = {
            message: errorData.message.replace(/"/g, ''),
            path: errorData.path,
            type: errorData.type,
            field,
          };

          errors.push(errorObject);
        }
      });
      req.errors = errors;
      res.apiResponse.validationError('Validation error', {}, errors);
      return;
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = validate;
