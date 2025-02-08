require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routesUpdateRoutes');


app.use(cors());
app.use(bodyParser.json());

app.use('/users', routes);


const PORT = process.env.PORT || 3002;

app.listen(3000, 'localhost', () => {
    console.log('Server running on port 3002');
  });
