
const { Evaluation, Question, Option } = require('../Model/deleteEvaluationModel');


const deleteEvaluation = async (req, res) => {
  const { evaluationId } = req.params;

  try {
    const evaluation = await Evaluation.findOne({ where: { evaluationId }, include: [{ model: Question, include: [Option] }] });

    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    await evaluation.destroy();

    return res.status(200).json({ message: 'Evaluation deleted successfully' });
  } catch (error) {
    console.error('Error deleting evaluation:', error);
    return res.status(500).json({ error: 'Error deleting evaluation', details: error.message });
  }
};

module.exports = { deleteEvaluation };
