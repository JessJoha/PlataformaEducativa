const express = require('express');
const router = express.Router();
const { createUserController } = require('../../../controllers/userController');


router.post('/create', createUserController);

module.exports = router;
