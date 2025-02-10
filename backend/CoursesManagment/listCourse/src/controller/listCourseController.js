const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Course = require('../model/listCourseModel'); 

dotenv.config();

exports.listCourses = async (req, res) => {
  try {
    
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {  
      return res.status(403).json({ message: 'Solo los administradores pueden listar cursos' });
    }

    
    const courses = await Course.findAll(); 
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found' });
    }

    
    return res.status(200).json({
      message: 'Courses retrieved successfully',
      courses,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ error: 'Error retrieving courses' });
  }
};