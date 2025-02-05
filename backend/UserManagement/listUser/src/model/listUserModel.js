const db = require('../config/db');

module.exports = {
  
  getAllUsers: async () => {
    try {
      const [rows] = await db.query("SELECT id, username, role FROM users");
      return rows;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }
};