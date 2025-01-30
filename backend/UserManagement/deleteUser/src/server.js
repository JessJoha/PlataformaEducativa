const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); 
const cors = require('cors');
const deleteUserRoutes = require('./routes/deleteUserRoutes');

dotenv.config();

const app = express();


app.use(express.json());


app.use(cors());


app.use('/user', deleteUserRoutes);


sequelize.sync()
  .then(() => {
    console.log('La base de datos y las tablas fueron creadas con éxito');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor deleteUser corriendo en el puerto ${PORT}`);
});
