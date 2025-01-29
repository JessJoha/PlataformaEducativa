const { Course } = require('../models/courseModel');

const createCourse = async (req, res) => {
    try {
        const { title, description, duration } = req.body;
        const course = await Course.create({ title, description, duration });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};

module.exports = { createCourse };
