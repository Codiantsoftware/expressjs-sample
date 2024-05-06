/**
 * Creates a new object by picking specific keys from the provided object.
 * @param {Object} object - The source object from which keys will be picked.
 * @param {string[]} keys - An array of keys to pick from the source object.
 * @returns {Object} - A new object containing only the picked keys and their corresponding values.
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {   
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = { pick };
