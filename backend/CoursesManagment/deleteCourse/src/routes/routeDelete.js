const express = require('express');
const router = express.Router();
const DeleteCourse = require('../controller/deleteCourseController');



router.delete('/delete/:id', DeleteCourse.deleteCourse);

module.exports = router;