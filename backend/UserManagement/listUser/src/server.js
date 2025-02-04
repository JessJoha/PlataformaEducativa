require('dotenv').config({ path: '../.env' })
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/listUserRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/users', routes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Microservicio ListUser corriendo en el puerto ${PORT}`);
});
