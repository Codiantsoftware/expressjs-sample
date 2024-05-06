const {
  envHelper: { getEnvVariable },
} = require('../src/helpers');

const email = {
  smtp: {
    pool: true,
    host: getEnvVariable('SMTP_HOST'),
    port: getEnvVariable('SMTP_PORT'),
    secure: false,
    tls: { rejectUnauthorized: false },
    auth: {
      user: getEnvVariable('SMTP_USER'),
      pass: getEnvVariable('SMTP_PASSWORD'),
    },
  },

  fromEmail: getEnvVariable('MAIL_FROM_EMAIL'),
  fromName: getEnvVariable('MAIL_FROM_NAME'),
};
module.exports = email;
