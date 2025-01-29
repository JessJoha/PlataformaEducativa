
const { Course } = require('../models/courseModel');

const createCourse = async (req, res) => {
  const { nameCourse, description, duration } = req.body;

  try {
    if (!nameCourse || !description || !duration) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newCourse = await Course.create({
      nameCourse,
      description,
      duration,
    });

    return res.status(201).json({   
      message: 'Course created successfully',
      course: newCourse,
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ error: 'Error creating course' });
  }
};

module.exports = {
  createCourse,
};
