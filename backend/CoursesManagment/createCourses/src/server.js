require('dotenv').config({ path: '../.env' })
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const routes = require('./routes/courseRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api', routes);


sequelize.sync()
  .then(() => console.log('Base de datos sincronizada con Sequelize'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Microservicio CreateCourse corriendo en el puerto ${PORT}`);
});