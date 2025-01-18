const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    referenceId: String,
    contractorId: String,
    bidAmount: Number,
    amountUsed: Number,
    selectedOption: String,
    paymentMade: Number,
    status: Boolean,
});

const payment = mongoose.model('payment', paymentSchema);

module.exports = payment;