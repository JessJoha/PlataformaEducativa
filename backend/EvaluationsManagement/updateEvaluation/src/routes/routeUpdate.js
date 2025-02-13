const express = require('express');
const { updateEvaluation } = require('../controller/updateEvaluationController');

const router = express.Router();

router.put('/update/:nameEvaluation', updateEvaluation);

module.exports = router;
