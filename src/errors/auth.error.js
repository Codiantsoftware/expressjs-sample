const HttpStatus=require('http-status');

class AuthError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || HttpStatus.UNAUTHORIZED;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AuthError;
