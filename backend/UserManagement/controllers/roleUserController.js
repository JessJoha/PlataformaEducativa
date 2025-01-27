const { Role } = require('../models/roleModel');


const initializeRoles = async () => {
  const predefinedRoles = ['estudiante', 'profesor', 'administrador'];

  for (const roleName of predefinedRoles) {
    const roleExists = await Role.findOne({ where: { name: roleName } });
    if (!roleExists) {
      await Role.create({ name: roleName });
    }
  }
};


const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const predefinedRoles = ['estudiante', 'profesor', 'administrador'];
    if (predefinedRoles.includes(name)) {
      return res.status(400).json({ message: 'Cannot create predefined roles' });
    }

    const newRole = await Role.create({ name });
    return res.status(201).json({ message: 'Role created successfully', role: newRole });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating role', error: error.message });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const predefinedRoles = ['estudiante', 'profesor', 'administrador'];
    if (predefinedRoles.includes(role.name)) {
      return res.status(400).json({ message: 'Cannot delete predefined roles' });
    }

    await role.destroy();
    return res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting role', error: error.message });
  }
};

module.exports = { initializeRoles, createRole, deleteRole };
