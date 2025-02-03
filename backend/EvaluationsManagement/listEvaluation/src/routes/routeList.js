const express = require('express');
const { listEvaluations } = require('../Controller/listEvaluationController');

const router = express.Router();

router.get('/list', listEvaluations);

module.exports = router;
