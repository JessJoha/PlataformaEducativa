const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || '*',
};
app.use(cors(corsOptions));

app.use('/courses', courseRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server is running...');
    });
  })
  .catch((err) => console.log('Error:', err));
