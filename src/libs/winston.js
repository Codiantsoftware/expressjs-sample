const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

const LOGGER_MSG_COLORS = {
  error: 'bold red',
  warn: 'italic cyan',
  info: 'yellow',
  debug: 'magenta',
};

winston.addColors(LOGGER_MSG_COLORS);
const colorizer = winston.format.colorize();
const datePattern = 'YYYY-MM-DD';

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.printf((msg) => colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.message}`))
    ),
  }),
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../../', 'logs/%DATE%.log'),
    datePattern,
    maxFiles: '5d',
  }),
];

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
  transports,
});
module.exports = logger;
