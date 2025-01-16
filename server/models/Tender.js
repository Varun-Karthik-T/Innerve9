const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    organisationChain: String,
    tenderReferenceNumber: String,
    tenderId: String,
    withdrawalAllowed: String,
    tenderType: String,
    formOfContract: String,
    tenderCategory: String,
    noOfCovers: Number,
    generalTechnicalEvaluationAllowed: String,
    itemWiseTechnicalEvaluationAllowed: String,
    paymentMode: String,
    isMultiCurrencyAllowedForBOQ: String,
    isMultiCurrencyAllowedForFee: String,
    allowTwoStageBidding: String,
});

const Tender = mongoose.model('tender', tenderSchema,'tender');

module.exports = Tender;