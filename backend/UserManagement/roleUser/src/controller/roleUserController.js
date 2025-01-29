
const { Role } = require('../../../models/roleModel');

const PREDEFINED_ROLES = ['estudiante', 'profesor', 'administrador'];

const initializeRoles = async () => {
  for (const roleName of PREDEFINED_ROLES) {
    const roleExists = await Role.findOne({ where: { name: roleName } });
    if (!roleExists) {
      await Role.create({ name: roleName });
    }
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    if (PREDEFINED_ROLES.includes(role.name)) {
      return res.status(400).json({ message: 'Cannot delete predefined roles' });
    }

    await role.destroy();
    return res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting role', error: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching roles', error: error.message });
  }
};

module.exports = { initializeRoles, deleteRole, getAllRoles };
