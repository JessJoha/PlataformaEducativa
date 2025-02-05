const db = require('../config/db');

module.exports = {


  findUserById: async (id) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      throw error;
    }
  },


  updateUserById: async (id, username, password, role) => {
    try {
    
      const user = await module.exports.findUserById(id);
      if (!user) return null;

 
      username = username || user.username;
      password = password || user.password;
      role = role || user.role;


      await db.query("UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?", 
        [username, password, role, id]);

      return { id, username, role };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  }
};
