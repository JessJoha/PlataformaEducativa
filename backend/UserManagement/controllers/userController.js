
const { User } = require('../models/userModel');
const { Role } = require('../models/roleModel'); 
const { generateToken } = require('../createUser/src/config/jwtConfig');
const { v4: uuidv4 } = require('uuid');


const createUserController = async (req, res) => {
  const { name, email, password, roleId } = req.body; 
  const userId = uuidv4();

  try {
  
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(400).json({ message: 'Invalid role ID' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const newUser = await User.create({
      userId,
      username: name,
      email,
      password,
      roleId, 
    });


    const token = generateToken(newUser.userId);

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

module.exports = { createUserController };
