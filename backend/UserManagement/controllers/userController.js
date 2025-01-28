const { User } = require('../models/userModel');
const { Role } = require('../models/roleModel');
const { v4: uuidv4 } = require('uuid');


const createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const defaultRole = await Role.findOne({ where: { name: 'estudiante' } });
    if (!defaultRole) {
      return res.status(500).json({ message: 'Error: Rol por defecto no encontrado' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }


    const newUser = await User.create({
      username: name,
      email,
      password,
      roleId: defaultRole.id,
    });

    return res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, as: 'Role' }],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};


const updateRoleController = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    const adminRole = await Role.findOne({ where: { name: 'administrador' } });
    if (req.user.roleId !== adminRole.id) {
      return res.status(403).json({ message: 'Acceso denegado: Solo administradores pueden cambiar roles' });
    }

    const validRoles = ['estudiante', 'profesor'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    const role = await Role.findOne({ where: { name: newRole } });
    if (!role) {
      return res.status(400).json({ message: 'Rol no encontrado' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.roleId = role.id;
    await user.save();

    return res.status(200).json({ message: 'Rol actualizado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
};

module.exports = { createUserController, getAllUsers, updateRoleController };
