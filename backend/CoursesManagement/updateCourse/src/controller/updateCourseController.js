const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Course  = require('../model/updateCourseModel');

dotenv.config();

exports.updateCourseController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Solo los administradores pueden actualizar cursos' });
    }

    const { id } = req.params; 
    const { title, description, accessKey } = req.body; 

    
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    
    course.title = title || course.title;
    course.description = description || course.description;
    course.accessKey = accessKey || course.accessKey;

    
    await course.save();

   
    return res.status(200).json({ message: 'Curso actualizado correctamente', course });
  } catch (error) {
    console.error("Error al actualizar curso:", error);
    return res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
  }
};