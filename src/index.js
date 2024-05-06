const cluster = require('cluster');
const os = require('os');
const dotenv = require('dotenv');

dotenv.config();
const { config } = require('../config');
const app = require('./app');
const { loggerService } = require('./services');
const { sequelize } = require('./models');


const numCPUs = os.cpus().length;

// Graceful shutdown handler
const gracefulShutdown = () => {
  loggerService.info('Received shutdown signal. Closing connections...');
  app.close(() => {
    loggerService.info('Server closed. Exiting process.');
    process.exit(0);
  });
};

// Handle termination signals for graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

if (cluster.isMaster) {
  loggerService.info(`Master process ${process.pid} is running`);

  sequelize
    .authenticate()
    .then(async () => {
      loggerService.info('Mysql connection has been established successfully.');
      await sequelize.sync();
     
      for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        loggerService.info(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster.fork();
      });
    })
    .catch((err) => {
      loggerService.error(`Unable to connect to the database: ${err}`);
      process.exit(1);
    });
} else {
  const { port } = config;
  app.listen(port, () => {
    loggerService.info(`Worker process ${process.pid} is listening on port ${port}`);
  });
}
