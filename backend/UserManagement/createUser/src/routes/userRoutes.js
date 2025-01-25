const express = require('express');
const router = express.Router();
const { createUserController } = require('../controllers/userController');  // Usamos el controlador correcto

// Ruta para crear un nuevo usuario
router.post('/create', createUserController);  // Llamamos directamente al controlador sin necesidad de manejar parámetros aquí

module.exports = router;
