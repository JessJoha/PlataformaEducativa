const express = require('express');
const { createCourse } = require('../Controller/courseController');

const router = express.Router();


router.post('/create', createCourse);

module.exports = router;