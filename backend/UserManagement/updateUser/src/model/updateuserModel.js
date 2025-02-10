const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

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

const findUserById = async (id) => {
  try {
    const user = await User.findByPk(id); 
    return user;  
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    throw error;  
  }
};


const updateUserById = async (id, username, password, role) => {
  try {
    const user = await findUserById(id); 
    if (!user) return null;  

   
    let hashedPassword = password ? await bcrypt.hash(password, 10) : user.password; 

    
    await user.update({
      username: username || user.username,  
      password: hashedPassword, 
      role: role || user.role  
    });

    return user;  
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;  
  }
};

module.exports = {
  findUserById,
  updateUserById
};