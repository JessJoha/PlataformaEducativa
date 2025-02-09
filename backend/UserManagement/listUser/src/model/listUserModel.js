const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',  
  timestamps: false    
});

module.exports = {
  
  getAllUsers: async () => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username', 'role'], 
      });
      return users; 
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;  
    }
  }
};