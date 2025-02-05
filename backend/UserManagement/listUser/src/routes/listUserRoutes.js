const express = require('express');
const router = express.Router();
const { listUser } = require('../controller/listUserController');

router.get('/users', listUser);

module.exports = router;
