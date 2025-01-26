
const { User } = require('../models/userModel');
const { generateToken } = require('../createUser/src/config/jwtConfig');
const { v4: uuidv4 } = require('uuid');


const createUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = uuidv4();

  try {
   
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    
    const newUser = await User.create({
      userId,
      username: name,
      email,
      password,
    });

    
    const token = generateToken(newUser.userId);

    return res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

module.exports = { createUserController };
