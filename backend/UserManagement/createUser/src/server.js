const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes'); 
const port = 3306;

app.use(express.json());

app.use('/users', userRoutes);

app.listen(3000, '0.0.0.0', () => {
    console.log("Servidor corriendo en http://0.0.0.0:3000");
  });