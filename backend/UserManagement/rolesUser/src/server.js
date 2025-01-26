const express = require('express');
const bodyParser = require('body-parser');
const roleRoutes = require('./routes/roleRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/auth', roleRoutes);


app.listen(PORT, () => {
  console.log(`Servicio de roles corriendo en el puerto ${PORT}`);
});

const initializeRoles = async () => {
  const predefinedRoles = ['estudiante', 'profesor', 'administrador'];

  for (const roleName of predefinedRoles) {
    const roleExists = await Role.findOne({ name: roleName });
    if (!roleExists) {
      await Role.create({ name: roleName });
    }
  }
};

initializeRoles();


