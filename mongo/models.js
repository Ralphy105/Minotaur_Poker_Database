const mongoose = require('mongoose');

// Transaction
const transactionSchema = new mongoose.Schema({
    amount: { type: Number, default: "hello" },
    clubgg_id: { type: String, required: true, unique: true },
    clubgg_name: { type: String, required: true },
    date: { type: Date, required: false },
    discord_id: { type: String, required: true, unique: true },
    discord_name: { type: String, required: true },
    platform: { type: String, enum: ['Venmo', 'Zelle', 'CashApp', 'PayPal'], required: true},
}, { strict: true });

// Unrestricted schema for misc collection
// const globalSchema = new mongoose.Schema({}, { strict: false });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    Transaction,
};