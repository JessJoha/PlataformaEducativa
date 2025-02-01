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

module.exports = { Evaluation };
