const express = require('express');
const router = express.Router();
const { createUserController } = require('../controllers/userController'); // Importa el controlador

// Ruta para crear un nuevo usuario
router.post('/create', createUserController); // Esta ruta será accesible desde `/user/create`

module.exports = router;
