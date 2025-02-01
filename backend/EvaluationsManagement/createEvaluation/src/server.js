const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const evaluationRoutes = require('./routes/evaluationRoutes');
const sequelize = require('./config/db');

dotenv.config();

console.log("🚀 Starting server...");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/evaluations', evaluationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`🌍 Server is running on port ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
});
