const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Evaluation = sequelize.define('Evaluation', {
  evaluationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nameEvaluation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  questions: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  timestamps: false,
});


const Question = sequelize.define('Question', {
  questionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Option = sequelize.define('Option', {
  optionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Evaluation.hasMany(Question, { foreignKey: 'evaluation_id', onDelete: 'CASCADE' });
Question.belongsTo(Evaluation, { foreignKey: 'evaluation_id' });

Question.hasMany(Option, { foreignKey: 'question_id', onDelete: 'CASCADE' });
Option.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = { Evaluation, Question, Option };
