const tokenService = require('./token.service');
const loggerService = require('./logger.service');
const emailService = require('./email.service');
const uploadService = require('./upload.service');
const authService = require('./auth.service');
const socketService = require('./socket.service');
const swaggerService = require('./swagger.service');

module.exports = {
  tokenService,
  loggerService,
  authService,
  //emailService,
  //uploadService,
  socketService,
  swaggerService,
};
