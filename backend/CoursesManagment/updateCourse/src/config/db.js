require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, 
    dialect: 'mysql',            
    port: process.env.DB_PORT,   
    logging: false      
  }
);


sequelize.authenticate()
  .then(() => console.log('Conectado a MySQL con Sequelize'))
  .catch(err => console.error('Error al conectar con MySQL:', err));
  
module.exports = sequelize;