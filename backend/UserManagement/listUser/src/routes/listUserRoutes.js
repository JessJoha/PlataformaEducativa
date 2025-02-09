const express = require('express');
const router = express.Router();
const listRoutes = require('../controller/listUserController');

router.get('/users', listRoutes.listUser);

module.exports = router;
