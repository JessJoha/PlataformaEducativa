const { User } = require('../Model/userModel');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username y password son requeridos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(username, hashedPassword, "student", (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Usuario registrado correctamente" });
    });

  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};