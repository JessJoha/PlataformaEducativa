
const express = require('express');
const router = express.Router();
const { deleteCourse } = require = require('../controller/deleteCourseController');


router.delete('/delete/:courseId', deleteCourse);

module.exports = router;