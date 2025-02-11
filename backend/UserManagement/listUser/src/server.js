
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/listUserRoutes');
require('./config/db'); 

app.use(cors());
app.use('/users', routes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Microservicio ListUser corriendo en el puerto ${PORT}`);
});
