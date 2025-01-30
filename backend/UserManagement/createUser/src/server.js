const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();


app.use(express.json());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('An error occurred!');
});


const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || '*',
};
app.use(cors(corsOptions));


app.use('/user', userRoutes);


sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log('Database synchronized successfully (Users)');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User server running on port ${PORT}`);
});
