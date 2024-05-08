const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetGoalSchema = new Schema({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0 // Ensure amount is not negative
    }
});

const BudgetGoal = mongoose.model('BudgetGoal', budgetGoalSchema);

module.exports = BudgetGoal;
