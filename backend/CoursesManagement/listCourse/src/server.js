const cors = require('cors');
require('dotenv').config({ path: '../.env' })
const express = require('express');
const listCourseRoutes = require('./routes/listRoutes'); 
const sequelize = require('./config/db');  
const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

app.use(express.json());

app.use('/courses', listCourseRoutes);


const PORT = process.env.PORT || 4002;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});
