const { DataTypes } = require('sequelize');
const sequelize = require('../../../createUser/src/config/db'); 
const { Role } = require('../../../models/roleModel');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.UUID,
    defaultValue: async () => {
      const role = await Role.findOne({ where: { name: 'estudiante' } });
      return role ? role.id : null;
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
module.exports = { User };
  