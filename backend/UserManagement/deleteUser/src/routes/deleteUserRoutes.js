const express = require('express');
const router = express.Router();
const userController = require('../controller/deleteUserController');

router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;