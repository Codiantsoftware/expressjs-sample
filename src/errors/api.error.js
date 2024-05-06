const HttpStatus = require('http-status');

class ApiError extends Error {
  constructor(message, statusCode = HttpStatus.BAD_REQUEST) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
