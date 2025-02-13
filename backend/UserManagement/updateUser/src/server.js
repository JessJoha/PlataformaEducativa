require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const updateUserRoutes = require('./routes/routesUpdateRoutes');
require('./config/db'); 

app.use(cors());
app.use(express.json());  

app.use('/users', updateUserRoutes);

app.listen(3004, '0.0.0.0', () => {
  console.log('Server running on port 3004');
});
