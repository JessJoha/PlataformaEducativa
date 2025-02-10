const { Evaluation } = require('../Model/listEvaluationModel');

const listEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    return res.status(200).json(evaluations);
  } catch (error) {
    console.error('Error listing evaluations:', error);
    return res.status(500).json({ error: 'Error listing evaluations' });
  }
};

module.exports = { listEvaluations };
