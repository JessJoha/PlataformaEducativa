const express = require('express');
const { createRole, deleteRole } = require('../../controllers/roleUserController');

const router = express.Router();


router.post('/', createRole);


router.delete('/:id', deleteRole);

module.exports = router;
