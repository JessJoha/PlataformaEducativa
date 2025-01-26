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
  res.status(500).send('¡Ocurrió un error!');
});


const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || '*',
};
app.use(cors(corsOptions));


app.use('/user', userRoutes); 


sequelize.sync()
  .then(() => {
    console.log('La base de datos y las tablas fueron creadas con éxito');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
