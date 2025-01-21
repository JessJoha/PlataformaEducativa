const express = require('express');
const router = express.Router();

// Array temporal para calificaciones
const calificaciones = [];

// Endpoint para calificar un curso
router.post('/calificaciones', (req, res) => {
    const { usuarioId, cursoId, calificacion } = req.body;

    if (!usuarioId || !cursoId || calificacion === undefined) {
        return res.status(400).json({ mensaje: 'Faltan datos necesarios' });
    }

    if (calificacion < 1 || calificacion > 10) {
        return res.status(400).json({ mensaje: 'La calificación debe estar entre 1 y 5' });
    }

    const nuevaCalificacion = {
        id: calificaciones.length + 1,
        usuarioId,
        cursoId,
        calificacion
    };

    calificaciones.push(nuevaCalificacion);
    res.status(201).json({ mensaje: 'Calificación registrada exitosamente', calificacion: nuevaCalificacion });
});

// Endpoint para obtener las calificaciones de un curso
router.get('/calificaciones/:cursoId', (req, res) => {
    const { cursoId } = req.params;
    const calificacionesCurso = calificaciones.filter(c => c.cursoId === parseInt(cursoId));

    if (calificacionesCurso.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron calificaciones para este curso' });
    }

    res.status(200).json(calificacionesCurso);
});

router.get('/calificaciones/curso/:cursoId/promedio', (req, res) => {
    const { cursoId } = req.params;
    const calificacionesCurso = calificaciones.filter(c => c.cursoId === parseInt(cursoId));

    if (calificacionesCurso.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron calificaciones para este curso' });
    }

    const promedio = calificacionesCurso.reduce((acc, c) => acc + c.calificacion, 0) / calificacionesCurso.length;
    res.status(200).json({ cursoId, promedio });
});


module.exports = router;
