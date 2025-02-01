const express = require('express');
const { createEvaluation } = require('../Controller/evaluationController');

const router = express.Router();

router.post('/create', createEvaluation);

module.exports = router;
