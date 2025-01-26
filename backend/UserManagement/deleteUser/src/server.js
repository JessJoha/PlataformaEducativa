const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); 
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Importa las rutas de usuarios


dotenv.config();

const app = express();


app.use(express.json());

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Ocurrió un error!');
});

// Middleware para habilitar CORS
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || '*',
};
app.use(cors(corsOptions));

// Uso de rutas
app.use('/user', userRoutes); // Ajusté la base de la ruta a `/user`

// Sincronización con la base de datos
sequelize.sync()
  .then(() => {
    console.log('La base de datos y las tablas fueron creadas con éxito');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Inicialización del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
