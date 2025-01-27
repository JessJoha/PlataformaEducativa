const { DataTypes } = require('sequelize');
const sequelize = require('../createUser/src/config/db'); 

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
}, {
  timestamps: false, 
});

module.exports = { Role };
