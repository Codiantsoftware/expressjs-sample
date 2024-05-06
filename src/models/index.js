const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const { database } = require('../../config');

const sequelize = new Sequelize(database.db, database.username, database.password, {
  host: database.host,
  port: database.port,
  timezone: database.timezone,
  pool: {
    acquire: 60000,
  },
  logging: false,
  dialect: 'mysql',
});

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.model.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  if (db[modelName].seedData) {
    db[modelName].seedData(dbConfig);
  }
  if (db[modelName].loadScopes) {
    db[modelName].loadScopes(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
