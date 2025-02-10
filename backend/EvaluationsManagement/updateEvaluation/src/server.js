const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const evaluationRoutes = require('./routes/routeUpdate');
const sequelize = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/evaluations', evaluationRoutes);

const PORT = process.env.PORT || 4009;
app.listen(PORT, '0.0.0.0', async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});
