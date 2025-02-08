const dotenv = require('dotenv');  
dotenv.config();
const { updateUserById, findUserById } = require('../model/updateUserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.updateUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];  
    if (!token) {
      return res.status(403).json({ error: "Token no proporcionado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: "Acceso denegado. Solo el administrador puede actualizar usuarios." });
    }

    const userId = req.params.id;  
    const { username, password, role } = req.body;  

    const user = await findUserById(userId);  
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    
    let hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    
    const updatedUser = await updateUserById(userId, username, hashedPassword, role);

    return res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el usuario: ' + error.message });
  }
};
