require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes'); 
require('./config/db'); 

app.use(express.json());

app.use('/users', userRoutes);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});