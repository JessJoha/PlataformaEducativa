require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const express = require('express');
const app = express();
const userRoutes = require('./routes/deleteUserRoutes'); 
require('./config/db'); 

app.use(cors());
app.use(express.json());  


app.use('/users', userRoutes);

app.listen(3001, '0.0.0.0', () => {
  console.log('Servidor de eliminación de usuarios corriendo en el puerto 3001');
});
