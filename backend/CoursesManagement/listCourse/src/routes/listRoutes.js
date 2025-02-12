const express = require('express');
const router = express.Router();
const ListCourse = require('../controller/listCourseController'); 


router.get('/courses', ListCourse.listCourses);

module.exports = router;