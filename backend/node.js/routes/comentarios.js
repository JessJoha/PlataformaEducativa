const express = require('express');
const router = express.Router();

// Array temporal para comentarios y reseñas
const comentarios = [];

// Endpoint para dejar un comentario o reseña
router.post('/comentarios', (req, res) => {
    const { usuarioId, cursoId, comentario, puntuacion } = req.body;

    if (!usuarioId || !cursoId || !comentario || puntuacion === undefined) {
        return res.status(400).json({ mensaje: 'Faltan datos necesarios' });
    }

    if (puntuacion < 1 || puntuacion > 5) {
        return res.status(400).json({ mensaje: 'La puntuación debe estar entre 1 y 5' });
    }

    const nuevoComentario = {
        id: comentarios.length + 1,
        usuarioId,
        cursoId,
        comentario,
        puntuacion
    };

    comentarios.push(nuevoComentario);
    res.status(201).json({ mensaje: 'Comentario registrado exitosamente', comentario: nuevoComentario });
});

// Endpoint para obtener los comentarios de un curso
router.get('/comentarios/:cursoId', (req, res) => {
    const { cursoId } = req.params;
    const comentariosCurso = comentarios.filter(c => c.cursoId === parseInt(cursoId));

    if (comentariosCurso.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron comentarios para este curso' });
    }

    res.status(200).json(comentariosCurso);
});

module.exports = router;
