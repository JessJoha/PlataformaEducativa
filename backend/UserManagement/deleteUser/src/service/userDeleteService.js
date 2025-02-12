const User = require('../model/deleteUserModel');

const deleteUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) return null;
    await user.destroy();
    return user;
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

module.exports = { deleteUserById };