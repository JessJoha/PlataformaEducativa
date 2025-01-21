const express = require('express');
const router = express.Router();

// Array temporal de evaluaciones
const evaluaciones = [];

// Endpoint para crear una evaluación
router.post('/evaluaciones', (req, res) => {
    const { cursoId, pregunta, opciones, respuestaCorrecta } = req.body;

    if (!cursoId || !pregunta || !opciones || !respuestaCorrecta) {
        return res.status(400).json({ mensaje: 'Faltan datos necesarios' });
    }

    const nuevaEvaluacion = {
        id: evaluaciones.length + 1,
        cursoId,
        pregunta,
        opciones,
        respuestaCorrecta
    };

    evaluaciones.push(nuevaEvaluacion);
    res.status(201).json({ mensaje: 'Evaluación creada exitosamente', evaluacion: nuevaEvaluacion });
});

// Endpoint para obtener las evaluaciones de un curso
router.get('/evaluaciones/:cursoId', (req, res) => {
    const { cursoId } = req.params;
    const evaluacionesCurso = evaluaciones.filter(e => e.cursoId === parseInt(cursoId));

    if (evaluacionesCurso.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron evaluaciones para este curso' });
    }

    res.status(200).json(evaluacionesCurso);
});

module.exports = router;
