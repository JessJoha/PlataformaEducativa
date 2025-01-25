const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/bd');  // Importa la conexión a la base de datos
const { User } = require('./models/userModel');  // Importa el modelo de usuario
const { generateToken, verifyToken } = require('./config/jwtConfig');  // Importa las funciones JWT

// Cargar las variables de entorno
dotenv.config();

const app = express();


app.use(express.json());


app.post('/create-user', async (req, res) => {
  const { name, email, password } = req.body;
  const userId = require('uuid').v4();  

  try {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

   
    const newUser = await User.create({
      userId,
      username: name,
      email,
      password, 
    });


    const token = generateToken(newUser.userId);

 
    return res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
});


sequelize.sync()
  .then(() => {
    console.log('La base de datos y las tablas fueron creadas con éxito');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
