const { User } = require('../Model/userModel');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username y password son requeridos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({ username, password: hashedPassword, role: "student" });

    res.status(201).json({ message: "Usuario registrado correctamente", user: newUser });

  } catch (error) {
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username y password son requeridos" });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await user.checkPassword(password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: user });
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
};