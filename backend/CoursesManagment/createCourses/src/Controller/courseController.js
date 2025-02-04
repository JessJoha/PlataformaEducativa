const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Course = require= require('../Model/courseModel');

dotenv.config();

const createCourse = async (req, res) => {
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

    // Crear el curso en la base de datos
    const course = await Course.create({
      title,
      description,
      accessKey,
      createdBy: decoded.id
    });

    return res.status(201).json({ message: 'Curso creado correctamente', course });
  } catch (error) {
    console.error("Error al crear curso:", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


module.exports = { createCourse };