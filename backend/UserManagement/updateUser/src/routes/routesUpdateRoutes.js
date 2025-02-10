const express = require('express');
const router = express.Router();
const updateController = require('../controller/updateUserController'); 


router.put('/:id', updateController.updateUser);

module.exports = router;