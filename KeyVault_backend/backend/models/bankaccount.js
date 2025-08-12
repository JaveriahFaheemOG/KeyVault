const mongoose = require('mongoose');

const BankAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    holder: {
        type: String,
        required: true,
        trim: true,
    },
    number: {
        type: String,
        required: true,
        unique: true, // Ensures each account number is unique
    },
    bank: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('BankAccount', BankAccountSchema);
