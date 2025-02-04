// src/controller/listCourseController.js
const { Course } = require('../model/courseModel');

const listCourses = async (req, res) => {
  try {
    const courses = await Course.findAll(); // Obtener todos los cursos
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found' });
    }
    return res.status(200).json({xxa
      message: 'Courses retrieved successfully',
      courses,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ error: 'Error retrieving courses' });
  }
};

module.exports = {
  listCourses,
};
