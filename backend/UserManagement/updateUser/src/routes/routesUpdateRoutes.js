const express = require('express');
const router = express.Router();
const { updateUser } = require('../controller/updateUserController');  
const { verifyToken } = require('../config/jwtConfig');

router.put('/:id', verifyToken, updateUser);

module.exports = router;