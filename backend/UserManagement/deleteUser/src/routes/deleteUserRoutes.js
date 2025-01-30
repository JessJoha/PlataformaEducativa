const express = require('express');
const router = express.Router();
const { deleteUserController } = require('../controller/deleteUserController');

router.delete('/delete/:userId', deleteUserController);

module.exports = router;
