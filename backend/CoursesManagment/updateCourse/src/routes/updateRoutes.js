const express = require('express');
const router = express.Router();
const { updateCourseController } = require('../controller/updateCourseController');
const { verifyToken } = require('../config/jwtConfig');


router.put('/courses/:id', verifyToken, updateCourseController);

module.exports = router;