const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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


User.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const deleteUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    
    if (!user) {
      return null;  
    }

    await user.destroy(); 
    return user;  
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

module.exports = { deleteUserById };