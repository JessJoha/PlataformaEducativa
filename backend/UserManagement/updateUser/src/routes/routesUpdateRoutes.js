const express = require('express');
const router = express.Router();
const updateController = require('../controller/updateUserController'); 


router.put('/update/:id', updateController.updateUser);

module.exports = router;