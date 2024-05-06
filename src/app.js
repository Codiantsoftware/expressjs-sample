const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const { apiResponseMiddleware } = require('./middlewares');
const { swaggerService } = require('./services');
const { AuthError, ApiError } = require('./errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerService));
app.use(apiResponseMiddleware);

routes(app);
app.use((error, req, res, next) => {
  if (error instanceof AuthError) {
    res.apiResponse.unauthorized(error.message);
  } else if (error instanceof ApiError) {
    res.apiResponse.badRequest(error.message);
  } else {
    res.apiResponse.error(error.message);
  }
});
module.exports = app;
