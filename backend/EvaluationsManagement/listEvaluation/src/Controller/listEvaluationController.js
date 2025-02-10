const { Evaluation } = require('../Model/listEvaluationModel');

exports.listEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    if (!evaluations || evaluations.length === 0) {
      return res.status(404).json({ error: "No evaluations found" });
    }
    res.status(200).json(evaluations);
  } catch (error) {
    console.error("Error listing evaluations:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};
