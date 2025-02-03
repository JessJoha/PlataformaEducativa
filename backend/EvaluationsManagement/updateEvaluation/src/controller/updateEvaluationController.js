const { Evaluation } = require('../../../createEvaluation/src/Model/evaluationModel');

const updateEvaluation = async (req, res) => {
  const { evaluationId } = req.params;
  const { nameEvaluation, description } = req.body;

  try {
    const evaluation = await Evaluation.findByPk(evaluationId);
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    evaluation.nameEvaluation = nameEvaluation || evaluation.nameEvaluation;
    evaluation.description = description || evaluation.description;
    await evaluation.save();

    return res.status(200).json({ message: 'Evaluation updated successfully', evaluation });
  } catch (error) {
    console.error('Error updating evaluation:', error);
    return res.status(500).json({ error: 'Error updating evaluation' });
  }
};

module.exports = { updateEvaluation };
