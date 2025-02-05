
const express = require('express');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/routeDelete');
const sequelize = require('./config/db');

dotenv.config();

const app = express();

app.use('/courses', courseRoutes);

sequelize.sync()
  .then(() => console.log('Base de datos sincronizada con Sequelize'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Microservicio DeleteCourse corriendo en el puerto ${PORT}`);
});