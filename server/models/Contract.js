const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    contractorId: String,   // contractor id (offchain assignment)
    organisationChain: String,
    referenceId: String,  // project id (contract id)
    bidAmount: Number,
    panelid : Number,
});

const Contract = mongoose.model('contract', contractSchema);

module.exports = Contract;