const { User } = require('../Model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username y password son requeridos" });
    }

    let userRole = 'student'; 
    if (role && role === 'admin') {
   
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: "Acceso no autorizado para asignar rol admin" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') {
        return res.status(403).json({ error: "Solo administradores pueden crear usuarios con rol admin" });
      }

      userRole = 'admin';  
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: userRole
    });

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

    const validPassword = await bcrypt.compare(password, user.password); 
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: user });
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
};


exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username y password son requeridos" });
    }


    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      username,
      password: hashedPassword,
      role: 'admin'  
    });

    res.status(201).json({ message: "Administrador creado correctamente", user: newAdmin });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el administrador: " + error.message });
  }
};
