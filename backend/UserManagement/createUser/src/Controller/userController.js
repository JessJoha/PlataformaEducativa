const { User } = require('../Model/userModel');
const { Role } = require('../../../roleUser/src/model/roleModel');
const { generateToken } = require('../../../createUser/src/config/jwtConfig');

const { v4: uuidv4 } = require('uuid');

const createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const defaultRole = await Role.findOne({ where: { name: 'student' } });
    if (!defaultRole) {
      return res.status(500).json({ message: 'Error: Default role not found' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({
      username: name,
      email,
      password,
      roleId: defaultRole.id,
    });

    const token = generateToken(newUser.userId);

    return res.status(201).json({ message: 'User created successfully', user: newUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, as: 'Role' }],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

const updateRoleController = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    const adminRole = await Role.findOne({ where: { name: 'administrator' } });
    if (req.user.roleId !== adminRole.id) {
      return res.status(403).json({ message: 'Access denied: Only administrators can change roles' });
    }

    const validRoles = ['student', 'teacher'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const role = await Role.findOne({ where: { name: newRole } });
    if (!role) {
      return res.status(400).json({ message: 'Role not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.roleId = role.id;
    await user.save();

    return res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating role', error: error.message });
  }
};

module.exports = { createUserController, getAllUsers, updateRoleController };
