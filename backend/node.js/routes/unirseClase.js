const express = require('express');
const router = express.Router();

// Lista simulada de clases
const clases = [
    { id: 1, nombre: 'Desarrollo Web con React', fechaHora: '2025-01-20T10:00:00Z' },
    { id: 2, nombre: 'Introducción a la Programación', fechaHora: '2025-01-21T14:00:00Z' }
];

// Endpoint para unirse a una clase en vivo
router.post('/clases-en-vivo/:id', (req, res) => {
    const { id } = req.params;

    // Buscar la clase en la lista
    const clase = clases.find(c => c.id === parseInt(id));

    // Verificar si la clase existe
    if (!clase) {
        return res.status(404).json({ mensaje: 'Clase no encontrada' });
    }

    // Responder si la clase existe
    res.status(200).json({
        mensaje: `Te has unido a la clase con ID: ${id} exitosamente`,
        clase: {
            id: clase.id,
            nombre: clase.nombre,
            fechaHora: clase.fechaHora
        }
    });
});

module.exports = router;
