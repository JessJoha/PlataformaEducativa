const express = require('express');
const { deleteEvaluation } = require('../controller/deleteEvaluationController');


const router = express.Router();

router.delete('/delete/:name', deleteEvaluation);

module.exports = router;
