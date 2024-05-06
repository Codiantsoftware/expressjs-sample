/**
 * Define the User Role model.
 * @param {import("sequelize").Sequelize} sequelize - The Sequelize instance.
 * @param {import("sequelize").DataTypes} DataTypes - The DataTypes object.
 * @returns {import("sequelize").Model} The User Role model.
 */
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
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
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  /**
   * Associate the User Role model with other models.
   * @param {import("sequelize").Sequelize.Models} models - The Sequelize models object.
   */
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, { foreignKey: "userId" });
    UserRole.belongsTo(models.Role, { foreignKey: "roleId" });
  };
  return UserRole;
};
