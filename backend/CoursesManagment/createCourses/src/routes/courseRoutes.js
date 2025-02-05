const express = require('express');
const router = express.Router();
const { createCourse } = require('../Controller/courseController');
const { verifyToken } = require('../config/jwtConfig');

router.post('/courses', verifyToken, createCourse);

module.exports = router;