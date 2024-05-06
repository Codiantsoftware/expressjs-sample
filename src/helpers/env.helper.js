/**
 * Retrieves an environment variable from process.env with an optional default value.
 * @param {string} key The key of the environment variable.
 * @param {any} [defaultValue=null] The default value if the environment variable is not defined.
 * @returns {string|number|boolean|null} The value of the environment variable or the default value.
 */
function getEnvVariable(key, defaultValue = null) {
  const { [key]: envValue = defaultValue } = process.env;
  if (envValue === 'true' || envValue === 'false') {
    return envValue === 'true';
  }
  return envValue;
}

module.exports = { getEnvVariable };
