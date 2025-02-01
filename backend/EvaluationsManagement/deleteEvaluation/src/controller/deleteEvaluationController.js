
const { Evaluation } = require('../../../createEvaluations/src/Model/evaluationModel');

const deleteEvaluation = async (req, res) => {
  const { evaluationId } = req.params;

  try {
    const evaluation = await Evaluation.findOne({ where: { evaluationId } });

    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    const userRole = req.user.role;
    if (userRole !== 'profesor' && userRole !== 'administrador') {
      return res.status(403).json({ error: 'Only professors and administrators can delete evaluations' });
    }

    await evaluation.destroy();

    return res.status(200).json({ message: 'Evaluation deleted successfully' });
  } catch (error) {
    console.error('Error deleting evaluation:', error);
    return res.status(500).json({ error: 'Error deleting evaluation' });
  }
};

module.exports = {
  deleteEvaluation,
};
