const { Evaluation } = require('../Model/evaluationModel');

const createEvaluation = async (req, res) => {
  const { nameEvaluation, description, questions } = req.body;

  try {
    if (!nameEvaluation || !description || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'All fields are required, including questions' });
    }

    const userRole = req.user.role;
    if (userRole !== 'profesor' && userRole !== 'administrador') {
      return res.status(403).json({ error: 'Only professors and administrators can create evaluations' });
    }

    const newEvaluation = await Evaluation.create({
      nameEvaluation,
      description,
      questions,
    });

    return res.status(201).json({
      message: 'Evaluation created successfully',
      evaluation: newEvaluation,
    });
  } catch (error) {
    console.error('Error creating evaluation:', error);
    return res.status(500).json({ error: 'Error creating evaluation' });
  }
};

module.exports = {
  createEvaluation,
};
