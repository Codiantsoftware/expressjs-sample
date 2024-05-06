const HttpStatus = require('http-status');

class ApiResponse {
  /**
   * Constructs a new ApiResponse object.
   *
   * @param {boolean} success - Indicates whether the API request was successful.
   * @param {string} message - The message associated with the API response.
   * @param {object|array} data - The data to include in the response.
   * @param {number} statusCode - The HTTP status code of the response.
   * @param {array} [errors=[]] - Array of error.
   */
  constructor(success, message, data, statusCode, errors = []) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.errors = errors;
  }

  /**
   * Create a successful API response.
   *
   * @param {string} message - The success message.
   * @param {object|array} data - The data to include in the response.
   * @param {number} [statusCode=HttpStatus.OK] - The HTTP status code.
   * Defaults to HttpStatus.OK if not provided.
   * @return {object} The API response object.
   */
  static success(message, data, statusCode = HttpStatus.OK) {
    return new ApiResponse(true, message, data, statusCode);
  }

  /**
   * Create an API response for an error.
   *
   * @param {string} message - The error message.
   * @param {object|array} data - The data to include in the response.
   * @param {number} [statusCode=HttpStatus.INTERNAL_SERVER_ERROR] - The HTTP status code.
   * @return {object} The API response object.
   */
  static error(message, data, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    return new ApiResponse(false, message, data, statusCode);
  }

  /**
   * Create an API response for a validation error.
   *
   * @param {string} message - The error message.
   * @param {object|array} data - The data to include in the response.
   * @param {array} errors - Array of error.
   * @return {object} The API response object.
   */
  static validationError(message, data, errors) {
    return new ApiResponse(false, message, data, HttpStatus.BAD_REQUEST, errors);
  }

  /**
   * Create an API response indicating that a resource was not found.
   *
   * @param {string} message - The error message.
   * @param {object|array} data - The data to include in the response.
   * @param {number} [statusCode=HttpStatus.NOT_FOUND] - The HTTP status code.
   * Defaults to HttpStatus.NOT_FOUND if not provided.
   * @return {object} The API response object.
   */
  static notFound(message, data, statusCode = HttpStatus.NOT_FOUND) {
    return new ApiResponse(false, message, data, statusCode);
  }

  /**
   * Create an API response indicating that the request was unauthorized.
   *
   * @param {string} message - The error message.
   * @param {object|array} data - The data to include in the response.
   * @param {number} [statusCode=HttpStatus.UNAUTHORIZED] - The HTTP status code.
   * Defaults to HttpStatus.UNAUTHORIZED if not provided.
   * @return {ApiResponse} The API response object.
   */
  static unauthorized(message, data, statusCode = HttpStatus.UNAUTHORIZED) {
    return new ApiResponse(false, message, data, statusCode);
  }

  /**
   * Create an API response indicating that the request was forbidden.
   *
   * @param {string} message - The error message.
   * @param {object|array} data - The data to include in the response.
   * @param {number} [statusCode=HttpStatus.FORBIDDEN] - The HTTP status code.
   * Defaults to HttpStatus.FORBIDDEN if not provided.
   * @return {ApiResponse} The API response object.
   */
  static forbidden(message, data, statusCode = HttpStatus.FORBIDDEN) {
    return new ApiResponse(false, message, data, statusCode);
  }

  /**
   * Create an API response indicating that a resource was successfully created.
   *
   * @param {string} message - The success message.
   * @param {object|array} data - The data to include in the response.
   * @param {number} [statusCode=HttpStatus.CREATED] - The HTTP status code.
   * Defaults to HttpStatus.CREATED.
   * @return {ApiResponse} The API response object.
   */
  static created(message, data, statusCode = HttpStatus.CREATED) {
    return new ApiResponse(true, message, data, statusCode);
  }

  /**
   * Create an API response with no content.
   *
   * @param {string} message - The success message.
   * @param {object|array} data - The data to include in the response.
   * @param {number} [statusCode=HttpStatus.NO_CONTENT] - The HTTP status code.
   * Defaults to HttpStatus.NO_CONTENT.
   * @return {ApiResponse} The API response object.
   */
  static noContent(message, data, statusCode = HttpStatus.NO_CONTENT) {
    return new ApiResponse(true, message, data, statusCode);
  }

  /**
   * Create an API response for a bad request.
   *
   * @param {string} message - The error message.
   * @param {object|array} data - The data to include in the response.
   * @param {number} [statusCode=HttpStatus.BAD_REQUEST] - The HTTP status code.
   * Defaults to HttpStatus.BAD_REQUEST.
   * @return {ApiResponse} The API response object.
   */
  static badRequest(message, data, statusCode = HttpStatus.BAD_REQUEST) {
    return new ApiResponse(false, message, data, statusCode);
  }
}

module.exports = ApiResponse;
