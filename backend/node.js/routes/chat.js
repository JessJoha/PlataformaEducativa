const express = require('express');
const router = express.Router();

// Endpoint para enviar mensajes en clase en vivo
router.post('/chat', (req, res) => {
    const { mensaje, usuarioId, claseId } = req.body;

    // Aquí iría la lógica para almacenar el mensaje y enviarlo en tiempo real

    res.status(200).json({
        mensaje: 'Mensaje enviado correctamente',
        mensajeData: {
            mensaje,
            usuarioId,
            claseId
        }
    });
});

module.exports = router;
