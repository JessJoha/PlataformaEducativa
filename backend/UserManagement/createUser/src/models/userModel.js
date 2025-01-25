const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Importa la conexión a la base de datos

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
    unique: true, // Asegura que el correo sea único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Si deseas que Sequelize maneje createdAt y updatedAt
});

module.exports = User;
