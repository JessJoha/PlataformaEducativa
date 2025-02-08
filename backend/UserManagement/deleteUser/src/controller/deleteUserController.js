const { deleteUserById } = require('../model/deleteUserModel');
const jwt = require('jsonwebtoken');

exports.deleteUser = async (req, res) => {
  try {
   
    const token = jwt.sign(
      { user_id: user.id, role: user.role },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
  );
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: "Acceso denegado. Solo el administrador puede eliminar usuarios." });
    }

   
    const { userId } = req.params;

    
    const user = await deleteUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

   
    res.status(200).json({ message: `Usuario con ID ${userId} eliminado correctamente.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  }
};
