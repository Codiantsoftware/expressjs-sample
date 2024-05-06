/**
 * Define the Role model.
 * @param {import("sequelize").Sequelize} sequelize - The Sequelize instance.
 * @param {import("sequelize").DataTypes} DataTypes - The DataTypes object.
 * @returns {import("sequelize").Model} The Role model.
 */
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  /**
   * Associate the Role model with other models.
   * @param {import("sequelize").Sequelize.Models} models - The Sequelize models object.
   */
  Role.associate = (models) => {
    Role.belongsToMany(models.Permission, {
      through: models.RolePermission,
      foreignKey: 'roleId',
    });
    Role.belongsToMany(models.Module, {
      through: models.RoleModule,
      foreignKey: 'roleId',
    });
    Role.hasMany(models.UserRole, { foreignKey: 'roleId' });
  };
  return Role;
};
