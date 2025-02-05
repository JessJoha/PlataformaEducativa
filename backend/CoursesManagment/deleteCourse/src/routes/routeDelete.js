const express = require('express');
const router = express.Router();
const { deleteCourse } = require('../controller/deleteCourseController');
const { verifyToken } = require('../config/jwtConfig');


router.delete('/courses/:id', verifyToken, deleteCourse);

module.exports = router;