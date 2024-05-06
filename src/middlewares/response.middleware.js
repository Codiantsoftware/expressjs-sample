const HttpStatus = require('http-status');
const { ApiResponse } = require('../helpers');

function attachApiResponse(req, res, next) {
  res.apiResponse = {
    success(message, data, statusCode = HttpStatus.OK) {
      res.status(statusCode).json(ApiResponse.success(message, data, statusCode));
    },
    error(message, data, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
      res.status(statusCode).json(ApiResponse.error(message, data, statusCode));
    },
    noContent(message, data, statusCode = HttpStatus.NO_CONTENT) {
      res.status(statusCode).json(ApiResponse.noContent(message, data, statusCode));
    },
    badRequest(message, data, statusCode = HttpStatus.BAD_REQUEST) {
      res.status(statusCode).json(ApiResponse.badRequest(message, data, statusCode));
    },
    validationError(message, data, errors) {
      res.status(HttpStatus.BAD_REQUEST).json(ApiResponse.validationError(message, data, errors));
    },
    created(message, data, statusCode = HttpStatus.CREATED) {
      res.status(statusCode).json(ApiResponse.created(message, data, statusCode));
    },
    forbidden(message, data, statusCode = HttpStatus.FORBIDDEN) {
      res.status(statusCode).json(ApiResponse.forbidden(message, data, statusCode));
    },
    unauthorized(message, data, statusCode = HttpStatus.UNAUTHORIZED) {
      res.status(statusCode).json(ApiResponse.unauthorized(message, data, statusCode));
    },
  };
  next();
}

module.exports = attachApiResponse;
