
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/routeDelete');
const sequelize = require('./config/db');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/courses', courseRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});
