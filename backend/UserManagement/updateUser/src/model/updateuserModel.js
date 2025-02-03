const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
    type: DataTypes.ENUM('student', 'admin'),
    defaultValue: 'student'
  }
}, {
  timestamps: true
});

module.exports = {
  User,

  findUserById: async (id) => {
    return await User.findByPk(id);
  },

  
  updateUserById: async (id, username, password, role) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    user.username = username;
    user.password = password;
    user.role = role;

    await user.save();
    return user;
  }
};
