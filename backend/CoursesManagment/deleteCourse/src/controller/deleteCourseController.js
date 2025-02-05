const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Course  = require('../model/deleteCourseModel');

dotenv.config();

const deleteCourse = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Solo los administradores pueden eliminar cursos' });
    }

    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    await course.destroy();
    return res.status(200).json({ message: 'Curso eliminado correctamente' });

  } catch (error) {
    console.error("Error al eliminar curso:", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { deleteCourse };