const express = require('express');
const { listEvaluations } = require('../controller/listEvaluationController');

const router = express.Router();

router.get('/list', listEvaluations);

module.exports = router;
