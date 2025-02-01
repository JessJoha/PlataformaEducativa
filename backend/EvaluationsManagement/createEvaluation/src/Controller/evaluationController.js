const { Evaluation } = require('../Model/evaluationModel');

const createEvaluation = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    if (!title || !description || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Title, description and at least one question are required' });
    }

    const newEvaluation = await Evaluation.create({
      title,
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