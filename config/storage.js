const {
  envHelper: { getEnvVariable },
} = require('../src/helpers');

const app = {
  mediaStorage: getEnvVariable('MEDIA_STORAGE'), 
  mediaUploadSizeLimit: getEnvVariable('MEDIA_UPLOAD_SIZE_LIMIT'),
};
module.exports = app;
