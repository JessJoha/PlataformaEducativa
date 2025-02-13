require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes'); 
require('./config/db'); 

const corsOptions = {
  origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'OPTIONS, PUT, DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/users', userRoutes);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});