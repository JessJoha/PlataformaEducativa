const { User } = require('../models/userModel');

const deleteUserController = async (req, res) => {
  const { userId } = req.params; // Suponiendo que se envía el ID del usuario a eliminar como parámetro de ruta

  try {
    // Busca al usuario por ID
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Elimina al usuario
    await user.destroy();

    return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

module.exports = { deleteUserController };
