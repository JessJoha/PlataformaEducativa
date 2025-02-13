require('dotenv').config({ path: '../.env' })
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const routes = require('./routes/courseRoutes');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/courses', routes);


sequelize.sync()
  .then(() => console.log('Base de datos sincronizada con Sequelize'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Microservicio CreateCourse corriendo en el puerto ${PORT}`);
});