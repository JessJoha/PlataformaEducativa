const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/updateUserController');
const { verifyToken } = require('../middleware/authMiddleware');

router.put('/users/:id', verifyToken, updateUser);

module.exports = router;
