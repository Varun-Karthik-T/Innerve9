const express = require("express");
const router = express.Router();
const Contract = require("../models/Contract");

router.post("/", async (req, res) => {
    try {
      const { contractorId, organisationChain, referenceId, bidAmount, panelid } = req.body;
  
      if (!contractorId || !organisationChain || !referenceId || !bidAmount || !panelid) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existingContract = await Contract.findOne({ referenceId });
      if (existingContract) {
        return res.status(400).json({ error: "Contract with this referenceId already exists" });
      }
      
      const newContract = new Contract({
        contractorId,
        organisationChain,
        referenceId,
        bidAmount,
        panelid,
      });
  
      await newContract.save();
      
      console.log("Contract added successfully");

      return res.status(201).json({
        message: "Contract added successfully",
        contract: newContract,
      });
    } catch (error) {
      console.error("Error adding contract:", error);
      res.status(500).json({ error: "Failed to add contract" });
    }
  });
  
  module.exports = router;