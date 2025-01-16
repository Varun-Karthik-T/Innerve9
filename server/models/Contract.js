const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    organisationChain: String,
    referenceId: String,
    bidAmount: Number,
    panelid : Number,
});

const Contract = mongoose.model('contract', contractSchema);

module.exports = Contract;