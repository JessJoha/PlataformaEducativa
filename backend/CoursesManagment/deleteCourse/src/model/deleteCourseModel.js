
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  accessKey: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});


const deleteCourse = async (id) => {
  try {
    const course = await Course.findByPk(id);
    if (!course) return null;


    await course.destroy();
    return course;
  } catch (error) {
    console.error("Error al eliminar curso:", error);
    throw error;
  }
};

module.exports = { Course, deleteCourse };
