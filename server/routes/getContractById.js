const router = require("express").Router();
const payment = require("../models/Payment");

router.get("/getContractById/:referenceId", async (req, res) => {
    try {
      const { referenceId } = req.params;
      const govContracts = await payment.find({ referenceId, status: false });
      res.json(govContracts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;