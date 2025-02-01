const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db'); 
const cors = require('cors');
const deleteUserRoutes = require('./src/routes/deleteUserRoutes');

dotenv.config();

const app = express();


app.use(express.json());

app.use(cors());


app.use('/user', deleteUserRoutes);


sequelize.sync()
  .then(() => {
    console.log('Database and tables were created successfully');
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`deleteUser server running on port ${PORT}`);
});
