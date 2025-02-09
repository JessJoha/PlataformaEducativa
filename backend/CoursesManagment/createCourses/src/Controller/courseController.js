const dotenv = require('dotenv');  
dotenv.config();
const { Course } = require('../Model/courseModel');
const jwt = require('jsonwebtoken');
exports.createCourse = async (req, res) => {
  try {
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Solo los administradores pueden crear cursos' });
    }

   
    const { title, description, accessKey } = req.body;

    
    if (!title || !description || !accessKey) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    
    const newCourse = await Course.create({
      title,            
      description,
      accessKey
    });

   
    return res.status(201).json({ message: 'Curso creado correctamente', course: newCourse });
  } catch (error) {
    console.error("Error al crear curso:", error);
    return res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
  }
};