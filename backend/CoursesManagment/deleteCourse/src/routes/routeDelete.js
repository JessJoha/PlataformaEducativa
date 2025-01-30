
const express = require('express');
const { deleteCourse } = require('../controller/deleteCourseController');

const router = express.Router();

router.delete('/delete/:courseId', deleteCourse);

module.exports = router;