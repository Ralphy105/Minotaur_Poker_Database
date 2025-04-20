const mongoose = require('mongoose');
const Payment_Platform = {
    VENMO: 'Venmo',
    ZELLE: 'Zelle',
    CASHAPP: 'CashApp',
    PAYPAL: 'PayPal',
};

// Transaction
const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    clubgg_id: { type: String, required: true },
    clubgg_name: { type: String, required: false },
    date: { type: Date, required: false },
    discord_id: { type: String, required: false },
    discord_name: { type: String, required: false },
    platform: { type: String, enum: Object.values(Payment_Platform), required: true },
    paid_name: { type: String, required: true },
}, { strict: true, timestamps: { createdAt: 'date_recorded', updatedAt: false } });

// User Handles
const paymentHandlesSchema = new mongoose.Schema({
    venmo: { type: String, required: false },
    zelle: { type: String, required: false },
    cashapp: { type: String, required: false },
    paypal: { type: String, required: false },
}, { _id: false });

// User
const userSchema = new mongoose.Schema({
    clubgg_id: { type: String, required: true, unique: true },
    discord_id: { type: String, required: false, unique: true },
    clubgg_name: { type: String, required: true, default: '_UNKNOWN_' },
    discord_name: { type: String, required: false },
    payment_handles: { type: paymentHandlesSchema, required: true, default: {} },
}, { timestamps: { createdAt: 'date_recorded' } });
userSchema.virtual('transactions', {
    ref: 'Transaction',
    localField: 'clubgg_id',
    foreignField: 'user',
    justOne: false
});

// Unrestricted schema for misc collection
// const globalSchema = new mongoose.Schema({}, { strict: false });

const Transaction = mongoose.model('Transaction', transactionSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Payment_Platform,
    Transaction,
    User
};