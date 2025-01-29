const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const cors = require('cors');
const roleRoutes = require('./routes/roleUserRoutes');

dotenv.config();

const app = express();


app.use(express.json());


const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || '*',
};
app.use(cors(corsOptions));


app.use('/roles', roleRoutes);


sequelize
  .sync({ alter: true })  // Asegura que la base de datos se sincronice correctamente
  .then(async () => {
    console.log('Base de datos sincronizada correctamente (Roles)');
    
    // Aquí se inicializan los roles
    await initializeRoles();
    console.log('Roles inicializados correctamente');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor de Roles corriendo en el puerto ${PORT}`);
});
