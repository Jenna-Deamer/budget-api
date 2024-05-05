const mongoose = require('mongoose');

const transaction = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Expense', 'Income'], // Only allow 'expense' or 'income' as values
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0 // Ensure amount is not negative
    },
    category: {
        type: String,
        enum: [
            "Housing",
            "Food",
            "Healthcare",
            "Transportation",
            "Entertainment",
            "Education",
            "Debt Payments",
            "Personal Care",
            "Taxes",
            "Other"
        ],
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('Transaction',transaction);