const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,   
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
    port: process.env.DB_PORT,
    logging: false        
  }
);


sequelize.authenticate()
  .then(() => {
    console.log('Connection to database established successfully.');
  })
  .catch((err) => {
    console.error('Could not connect to the database. Verify credentials and connectivity:', err);
  });

module.exports = sequelize;
