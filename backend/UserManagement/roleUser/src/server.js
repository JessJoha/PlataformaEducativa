const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); 
const cors = require('cors');
const roleRoutes = require('./routes/roleUserRoutes'); 
const { initializeRoles } = require('../controllers/roleUserController');

dotenv.config();

const app = express();

app.use(express.json());


const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || '*',
};
app.use(cors(corsOptions));


app.use('/roles', roleRoutes);


sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    initializeRoles();
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`RoleUser service running on port ${PORT}`);
});
