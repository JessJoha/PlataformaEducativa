const express = require('express');
const router = express.Router();
const updateCourse = require('../controller/updateCourseController');


router.put('/update/:id', updateCourse.updateCourseController);

module.exports = router;