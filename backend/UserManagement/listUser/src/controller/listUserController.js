const dotenv = require('dotenv');  
dotenv.config();
const { getAllUsers } = require('../model/listUserModel');
const jwt = require('jsonwebtoken');

dotenv.config();

exports.listUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Solo los administradores pueden ver los usuarios' });
    }

  
    const users = await getAllUsers();

    
    const usersData = users.map(user => user.toJSON());

    return res.status(200).json({ users: usersData });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

