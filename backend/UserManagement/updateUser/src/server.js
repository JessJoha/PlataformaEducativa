require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const updateUserRoutes = require('./routes/routesUpdateRoutes');
require('./config/db'); 


app.use(express.json());  

app.use('/users', updateUserRoutes);

app.listen(3004, 'localhost', () => {
  console.log('Server running on port 3004');
});
