const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['expense', 'income'], // Only allow 'expense' or 'income' as values
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


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
