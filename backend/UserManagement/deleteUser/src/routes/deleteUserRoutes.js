const express = require('express');
const router = express.Router();
const { deleteUserController } = require('../controllers/deleteUserController'); // Importa el controlador

// Ruta para eliminar un usuario
router.delete('/:userId', deleteUserController); // La ruta será accesible desde `/user/:userId`

module.exports = router;