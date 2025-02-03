const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const { JWT_SECRET_KEY } = process.env; 


exports.updateUser = async (req, res) => {
  try {
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

 
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Solo el administrador puede actualizar usuarios' });
    }

    const userId = req.params.id; 
    const { name, email, password, role } = req.body; 

  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

   
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save();

    return res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};
