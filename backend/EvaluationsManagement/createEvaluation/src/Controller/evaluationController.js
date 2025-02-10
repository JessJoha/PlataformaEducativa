const { Evaluation, Question, Option } = require('../Model/createEvaluationModel');
const jwt = require('jsonwebtoken');

exports.createEvaluation = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.role) {
      return res.status(403).json({ error: "Invalid token or missing permissions" });
    }

    const { nameEvaluation, description, questions } = req.body;

    if (!nameEvaluation || !description || !questions || questions.length === 0) {
      return res.status(400).json({ error: "All fields are required, including questions" });
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
      message: "Evaluation created successfully",
      evaluation: newEvaluation
    });

  } catch (error) {
    console.error("Error creating evaluation:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};
