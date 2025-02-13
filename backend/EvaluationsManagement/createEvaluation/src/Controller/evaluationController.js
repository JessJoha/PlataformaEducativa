const { Evaluation, Question, Option } = require('../Model/evaluationModel');

const createEvaluation = async (req, res) => {
  const { nameEvaluation, description, questions } = req.body;

  try {
    if (!nameEvaluation || !description || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'All fields are required, including questions' });
    }



    const newEvaluation = await Evaluation.create({
      nameEvaluation,
      description,
      questions: []
    });


    for (const question of questions) {
      const newQuestion = await Question.create({
        questionText: question.question_text,
        evaluation_id: newEvaluation.evaluationId
      });


      for (const option of question.options) {
        await Option.create({
          optionText: option.option_text,
          isCorrect: option.is_correct,
          question_id: newQuestion.id
        }); 
      }
    }

    return res.status(201).json({
      message: 'Evaluation created successfully',
      evaluation: newEvaluation,
    });

  } catch (error) {
    console.error('Error creating evaluation:', error);
    return res.status(500).json({
      error: 'Error creating evaluation',
      details: error.message
    });
  }
};

module.exports = {
  createEvaluation,
};
