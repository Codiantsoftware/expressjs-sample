/**
 * Define the User model.
 * @param {import("sequelize").Sequelize} sequelize - The Sequelize instance.
 * @param {import("sequelize").DataTypes} DataTypes - The DataTypes object.
 * @returns {import("sequelize").Model} The User model.
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Deleted'),
        defaultValue: 'Active',
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  /**
   * Associate the User model with other models.
   * @param {import("sequelize").Sequelize.Models} models - The Sequelize models object.
   */
  User.associate = (models) => {
    User.hasOne(models.UserProfile, { foreignKey: 'userId' });
    User.hasMany(models.UserToken, { foreignKey: 'userId' });
    User.hasMany(models.UserLogin, { foreignKey: 'userId' });
    User.hasMany(models.UserRole, { foreignKey: 'userId' });
  };
  return User;
};
