const router = require("express").Router();
const Contract = require("../models/Contract");
const payment = require("../models/Payment");

router.post("/", async (req, res) => {
    try {
      const { contractorId, referenceId, bidAmount, amountUsed, selectedOption, paymentMade, status } = req.body;
  
      if (!contractorId || !referenceId) {
        return res.status(400).json({ error: "contractorId and referenceId are required" });
      }
  
      const existingContract = await Contract.findOne({ referenceId });
      if (!existingContract) {
        return res.status(404).json({ error: "Contract with this referenceId not found" });
      }
  
      if (existingContract.contractorId !== contractorId) {
        return res.status(403).json({ error: "Invalid contractorId for this referenceId" });
      }
  
      const newPayment = new payment({
        referenceId,
        contractorId,
        bidAmount: bidAmount || existingContract.bidAmount,
        amountUsed: amountUsed,
        selectedOption: selectedOption,
        paymentMade: paymentMade, 
        status: status, 
      });
  
      await newPayment.save();
  
      return res.status(201).json({
        message: "Payment created successfully for the contract",
        payment: newPayment,
      });
    } catch (error) {
      console.error("Error updating contract:", error);
      res.status(500).json({ error: "Failed to create payment for the contract" });
    }
  });

  module.exports = router;