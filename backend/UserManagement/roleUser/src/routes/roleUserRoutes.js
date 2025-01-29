const express = require('express');
const { getAllRoles, deleteRole} = require('../../controllers/roleUserController');

const router = express.Router();

router.get('/', getAllRoles);


router.delete('/:id', deleteRole);

module.exports = router;
