const express = require('express');
const { getAllRoles, deleteRole} = require('../controller/roleUserController');

const router = express.Router();


router.get('/', getAllRoles);


router.delete('/:id', deleteRole);

module.exports = router;
