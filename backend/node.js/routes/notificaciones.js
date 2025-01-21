const express = require('express');
const router = express.Router();

// Array temporal para notificaciones
const notificaciones = [];

// Endpoint para enviar una notificación
router.post('/notificaciones', (req, res) => {
    const { usuarioId, mensaje } = req.body;

    if (!usuarioId || !mensaje) {
        return res.status(400).json({ mensaje: 'Faltan datos necesarios' });
    }

    const nuevaNotificacion = {
        id: notificaciones.length + 1,
        usuarioId,
        mensaje,
        fecha: new Date().toISOString()
    };

    notificaciones.push(nuevaNotificacion);
    res.status(201).json({ mensaje: 'Notificación enviada exitosamente', notificacion: nuevaNotificacion });
});

// Endpoint para obtener notificaciones de un usuario
router.get('/notificaciones/:usuarioId', (req, res) => {
    const { usuarioId } = req.params;
    const notificacionesUsuario = notificaciones.filter(n => n.usuarioId === parseInt(usuarioId));

    if (notificacionesUsuario.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron notificaciones para este usuario' });
    }

    res.status(200).json(notificacionesUsuario);
});

module.exports = router;
