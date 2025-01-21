
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const multer = require('multer');
const s3 = require('./auth/awsConfig');

dotenv.config();  // Cargar variables de entorno

const app = express();
app.use(express.json());  // Para manejar JSON en las peticiones

const users = [];  // Array temporal para almacenar usuarios (en producción usarías una DB)

// Ruta para registrar un nuevo usuario
app.post('/autenticacion/registro', async (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = { username, password: hashedPassword };
    users.push(newUser);  // Almacenar el usuario (en producción, en DB)

    res.status(201).json({ message: 'Usuario registrado con éxito' });
});

// Ruta para iniciar sesión
app.post('/autenticacion/inicio-de-sesion', async (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Inicio de sesión exitoso', token });
});

// Configuración del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Roles predefinidos
const roles = [
    { id: 1, role: 'estudiante' },
    { id: 2, role: 'profesor' },
    { id: 3, role: 'administrador' }
];

// Ruta para obtener roles
app.get('/auth/roles', (req, res) => {
    res.json(roles);
});

// Cursos predefinidos
const cursos = [
    { id: 1, nombre: 'Introducción a la programación', categoria: 'Tecnología' },
    { id: 2, nombre: 'Matemáticas para programadores', categoria: 'Ciencia' },
    { id: 3, nombre: 'Desarrollo web con React', categoria: 'Tecnología' }
];

// Ruta para obtener cursos
app.get('/cursos', (req, res) => {
    res.json(cursos);
});

// Detalles del curso
app.get('/cursos/:id', (req, res) => {
    const cursoId = parseInt(req.params.id);
    const curso = cursos.find(c => c.id === cursoId);

    if (!curso) {
        return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    res.json(curso);
});

// Crear nuevo curso
app.post('/cursos', (req, res) => {
    const { nombre, categoria } = req.body;

    if (!nombre || !categoria) {
        return res.status(400).json({ mensaje: 'Nombre y categoría son requeridos' });
    }

    const nuevoCurso = {
        id: cursos.length + 1, // Asignamos un ID incrementando
        nombre,
        categoria
    };

    cursos.push(nuevoCurso); // Agregar el curso al arreglo

    res.status(201).json(nuevoCurso);
});

// Configuración de multer
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5MB por archivo
});

// Subir contenido al curso
app.post('/cursos/:id/contenido', upload.single('archivo'), (req, res) => {
    const { id } = req.params;
    const curso = cursos.find(c => c.id === parseInt(id));

    if (!curso) {
        return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    if (!req.file) {
        return res.status(400).json({ mensaje: 'Archivo requerido' });
    }

    const params = {
        Bucket: 'TU_BUCKET_NAME', // Cambia por el nombre de tu bucket
        Key: `${id}/${req.file.originalname}`, // Carpeta por ID del curso
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };

    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error subiendo archivo', error: err });
        }
        res.status(200).json({ mensaje: 'Archivo subido exitosamente', url: data.Location });
    });
});
//Rutas de clases en vivo y chat
const clasesEnVivoRoutes = require('./routes/clasesEnVivo');
const unirseClaseRoutes = require('./routes/unirseClase');
const chatRoutes = require('./routes/chat');
const evaluacionesRoutes = require('./routes/evaluaciones');
const inscripcionesRoutes = require('./routes/inscripciones');
const calificacionesRoutes = require('./routes/calificaciones');
const notificacionesRoutes = require('./routes/notificaciones');

// Usar las rutas en el servidor
app.use(clasesEnVivoRoutes);
app.use(unirseClaseRoutes);
app.use(chatRoutes);
app.use(evaluacionesRoutes);
app.use(inscripcionesRoutes);
app.use(calificacionesRoutes);
app.use(notificacionesRoutes);
