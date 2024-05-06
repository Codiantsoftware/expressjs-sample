const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const { config } = require('../../config');

const swaggerDefinition = {
  info: {
    title: 'Express Base Project REST API',
    version: '1.0.0',
    description: 'Express Base Project REST API',
  },
  host: config.baseUrl,
  basePath: '/api/v1',
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      description: 'JWT authorization of an API',
      name: 'Authorization',
      in: 'header',
    },
    CsrfToken: {
      type: 'apiKey',
      description: 'CSRF token for API requests',
      name: 'x-csrf-token',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(path.resolve('api-docs'), '*.yaml')],
};

module.exports = swaggerJSDoc(options);
