const express = require("express");
const router = express.Router();
const Tender = require("../models/Tender"); 

router.get("/", async (req, res) => {
    try {
      const tenders = await Tender.find();
      console.log(tenders);
      res.json(tenders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;