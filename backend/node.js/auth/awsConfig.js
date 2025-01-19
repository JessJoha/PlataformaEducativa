const AWS = require('aws-sdk');

// Configuración de AWS S3
AWS.config.update({
    accessKeyId: 'TU_ACCESS_KEY_ID',
    secretAccessKey: 'TU_SECRET_ACCESS_KEY',
    region: 'us-east-1' // Cambia según tu región
});

const s3 = new AWS.S3();

module.exports = s3;
