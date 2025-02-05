require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const userRoutes = require('./routes/deleteUserRoutes'); 
require('./config/db'); 


app.use(express.json());

app.use('/users', userRoutes);

app.listen(3001, 'localhost', () => {
  console.log('Servidor de eliminación de usuarios corriendo en el puerto 3001');
});
