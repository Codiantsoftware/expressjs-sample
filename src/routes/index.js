const authRoutesV1 = require('./v1/auth.route');

const routes = (app) => {
  app.use('/api/v1', authRoutesV1);
};
module.exports = routes;
