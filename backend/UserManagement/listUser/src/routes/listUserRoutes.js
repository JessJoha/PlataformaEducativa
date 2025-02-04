const express = require('express');
const router = express.Router();
const { listUser } = require('../controller/listUserController');
const { verifyToken } = require('../config/jwtConfig');

router.get('/users', verifyToken, listUser);

module.exports = router;
