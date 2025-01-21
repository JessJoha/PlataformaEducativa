const express = require('express');
const router = express.Router();

// Array temporal para las inscripciones
const inscripciones = [];

// Endpoint para inscribirse en un curso
router.post('/inscripciones', (req, res) => {
    const { usuarioId, cursoId } = req.body;

    if (!usuarioId || !cursoId) {
        return res.status(400).json({ mensaje: 'Faltan datos necesarios' });
    }

    const nuevaInscripcion = {
        id: inscripciones.length + 1,
        usuarioId,
        cursoId
    };

    inscripciones.push(nuevaInscripcion);
    res.status(201).json({ mensaje: 'Inscripción realizada exitosamente', inscripcion: nuevaInscripcion });
});

// Endpoint para obtener las inscripciones de un usuario
router.get('/inscripciones/:usuarioId', (req, res) => {
    const { usuarioId } = req.params;
    const inscripcionesUsuario = inscripciones.filter(i => i.usuarioId === parseInt(usuarioId));

    if (inscripcionesUsuario.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron inscripciones para este usuario' });
    }

    res.status(200).json(inscripcionesUsuario);
});

module.exports = router;
