const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const evaluationRoutes = require('./routes/evaluationRoutes');
const sequelize = require('./config/db');

dotenv.config();

console.log("Starting server...");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/evaluations', evaluationRoutes);

const PORT = process.env.PORT || 4006;

app.listen(PORT, '0.0.0.0', async () => {

  console.log(`Server is running on port ${PORT}`);

  try {
    await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});
