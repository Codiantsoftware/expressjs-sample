const { logger } = require("../libs");

const loggerService = {
  /**
   * Log message with level.
   *
   * @param {type} level - level of message
   * @param {type} message - message to be logged
   * @return {void}
   */
  log(level, message) {
    logger.log(level, message);
  },
  /**
   *Log error type message
   *
   * @param {type} message - message to be logged
   * @return {void}
   */
  error(message) {
    logger.error(message);
  },
  /**
   *Log warn type message
   *
   * @param {type} message - message to be logged
   * @return {void}
   */
  warn(message) {
    logger.warn(message);
  },
  /**
   *Log info type message
   *
   * @param {type} message - message to be logged
   * @return {void}
   */
  info(message) {
    logger.info(message);
  },
  /**
   *Log verbose type message
   *
   * @param {type} message - message to be logged
   * @return {void}
   */
  verbose(message) {
    logger.verbose(message);
  },
  /**
   *Log debug type message
   *
   * @param {type} message - message to be logged
   * @return {void}
   */
  debug(message) {
    logger.debug(message);
  },
};
module.exports = loggerService;
