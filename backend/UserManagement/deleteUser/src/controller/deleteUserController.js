const { deleteUserById } = require('../Model/userModel');
const jwt = require('jsonwebtoken'); // Para verificar el token

exports.deleteUser = async (req, res) => {
  try {
  
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(403).json({ error: "Token no proporcionado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: "Acceso denegado. Solo el administrador puede eliminar usuarios." });
    }

    
    const { userId } = req.params;

    
    await deleteUserById(userId);

    res.status(200).json({ message: `Usuario con ID ${userId} eliminado correctamente.` });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  }
};
