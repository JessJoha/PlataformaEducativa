const express = require('express');
const router = express.Router();
const { createUserController, getAllUsers, updateRoleController} = require('../../../controllers/userController');


router.post('/create', createUserController);

router.get('/', getAllUsers);

router.put('/updateRole', updateRoleController);    

module.exports = router;
