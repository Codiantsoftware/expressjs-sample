/**
 * Define the User Profile model.
 * @param {import("sequelize").Sequelize} sequelize - The Sequelize instance.
 * @param {import("sequelize").DataTypes} DataTypes - The DataTypes object.
 * @returns {import("sequelize").Model} The User Profile model.
 */
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  /**
   * Associate the User Profile model with other models.
   * @param {import("sequelize").Sequelize.Models} models - The Sequelize models object.
   */
  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return UserProfile;
};
