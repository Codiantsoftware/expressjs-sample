const { sequelize } = require('../models');

class BaseRepository {
  constructor(modelName) {
    this.Model = sequelize.models[modelName];
  }

  /**
   * Retrieves all records from the database based on the provided options.
   *
   * @param {Object} options - The options to customize the query.
   * @param {number} options.page - The page number (default: 1).
   * @param {number} options.pageSize - The number of records per page (default: 10).
   * @param {string} options.sortBy - The column to sort by.
   * @param {string} options.sortOrder - The sort order (default: 'ASC').
   * @param {string} options.searchBy - The column to search by.
   * @param {string} options.searchValue - The value to search for.
   * @param {Array} options.scopes - The scopes to apply to the query.
   * @param {Array} options.includes - The associations to include in the result.
   * @returns {Promise} - A promise that resolves to the result of the query.
   * @throws {Error} - If there is an error fetching the records.
   */
  async getAll(options = {}) {
    try {
      // Extract the options
      const { page = 1, pageSize = 10, sortBy, sortOrder = 'ASC', searchBy, searchValue, scopes, includes } = options;

      // Calculate the offset for pagination
      const offset = (page - 1) * pageSize;

      // Set up the query options
      const queryOptions = {
        offset,
        limit: pageSize,
        order: sortBy ? [[sortBy, sortOrder]] : [],
        where: searchBy && searchValue ? { [searchBy]: searchValue } : {},
        include: this.buildIncludes(includes),
      };

      // Apply scopes if provided
      if (scopes && Array.isArray(scopes)) {
        queryOptions.scopes = scopes;
      }

      // Execute the query and return the result
      return await this.Model.findAll(queryOptions);
    } catch (error) {
      // Throw an error if there is an issue fetching the records
      throw new Error(`Error fetching ${this.Model.name}s: ${error.message}`);
    }
  }

  /**
   * Retrieves a record from the database by its primary key (ID).
   *
   * @param {number|string} id - The ID of the record to fetch.
   * @returns {Promise} - A promise that resolves to the fetched record.
   * @throws {Error} - If there is an error fetching the record.
   */
  async getById(id) {
    try {
      const record = await this.Model.findByPk(id);

      return record;
    } catch (error) {
      throw new Error(`Error fetching ${this.Model.name} with ID ${id}: ${error.message}`);
    }
  }

  /**
   * Creates a new record in the database.
   *
   * @param {Object} data - The data to create the record with.
   * @returns {Promise} - A promise that resolves to the created record.
   * @throws {Error} - If there is an error creating the record.
   */
  async create(data, transaction = null) {
    try {
      const options = { ...data, transaction };
      return await this.Model.create(options);
    } catch (error) {
      throw new Error(`Error creating ${this.Model.name}: ${error.message}`);
    }
  }

  /**
   * Updates a record in the database.
   *
   * @param {number|string} id - The ID of the record to update.
   * @param {Object} newData - The new data to update the record with.
   * @returns {Promise} - A promise that resolves to the updated record.
   * @throws {Error} - If there is an error updating the record.
   */
  async update(id, newData) {
    try {
      const item = await this.getById(id);

      if (!item) {
        throw new Error(`${this.Model.name} with ID ${id} not found.`);
      }

      await item.update(newData);

      return item;
    } catch (error) {
      throw new Error(`Error updating ${this.Model.name} with ID ${id}: ${error.message}`);
    }
  }

  /**
   * Deletes a record from the database.
   *
   * @param {number|string} id - The ID of the record to delete.
   * @returns {Promise} - A promise that resolves to the deleted record.
   * @throws {Error} - If there is an error deleting the record.
   */
  async delete(id) {
    try {
      const item = await this.getById(id);

      if (!item) {
        throw new Error(`${this.Model.name} with ID ${id} not found.`);
      }

      await item.destroy();

      return item;
    } catch (error) {
      throw new Error(`Error deleting ${this.Model.name} with ID ${id}: ${error.message}`);
    }
  }

  /**
   * Retrieves the count of records in the database.
   *
   * @returns {Promise<number>} - A promise that resolves to the count of records.
   * @throws {Error} - If there is an error counting the records.
   */
  async count() {
    try {
      return await this.Model.count();
    } catch (error) {
      throw new Error(`Error counting ${this.Model.name}s: ${error.message}`);
    }
  }

  /**
   * Builds an array of valid includes based on the given includes array.
   *
   * @param {Array} includes - An array of includes.
   * @return {Array} An array of valid includes.
   */
  buildIncludes(includes) {
    if (!includes || !Array.isArray(includes)) {
      return [];
    }

    const validIncludes = [];

    includes.forEach((inc) => {
      if (this.isValidAssociation(inc)) {
        validIncludes.push(inc);
      }
    });

    return validIncludes;
  }

  /**
   * Checks if the given include is a valid association.
   *
   * @param {Object} include - The include to check.
   * @param {string} include.model - The name of the associated model.
   * @param {string} include.as - The association alias.
   * @return {boolean} Whether the include is a valid association.
   */
  isValidAssociation(include) {
    // Check if the include object has the required properties.
    const { model, as } = include;
    if (!model || !as) {
      return false;
    }

    // Try to get the associated model from the Sequelize instance.
    const associatedModel = sequelize.models[model];

    // Check if the associated model exists and has the specified association.
    return associatedModel && associatedModel.associations[as];
  }

  async findOne(where, attributes = []) {
    try {
      const options = {
        where,
        attributes: attributes.length > 0 ? attributes : undefined,
      };
      const item = await this.Model.findOne(options);

      return item;
    } catch (error) {
      throw new Error(`Error finding one ${this.Model.name}: ${error.message}`);
    }
  }
}

module.exports = BaseRepository;
