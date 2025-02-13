const express = require('express');
const { deleteEvaluation } = require('../controller/deleteEvaluationController');


const router = express.Router();

router.delete('/delete/:evaluationId', deleteEvaluation);

module.exports = router;
