const express = require('express');
const router = express.Router();

// Endpoint para crear una clase en vivo
router.post('/clases-en-vivo', (req, res) => {
    const { nombre, descripcion, fechaHora, instructorId } = req.body;

    // Aquí iría la lógica para crear la clase (guardarla en la base de datos, etc.)

    res.status(201).json({
        mensaje: 'Clase en vivo creada correctamente',
        clase: {
            id: 1,  // Este es un valor de ejemplo, debería generarse dinámicamente
            nombre,
            descripcion,
            fechaHora,
            instructorId
        }
    });
});

module.exports = router;
