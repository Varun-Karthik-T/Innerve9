const router = require("express").Router();
const Issue = require("../models/Issue");

router.get("/", async (req, res) => {
    try {
      console.log("GET /issues");
  
      const issues = await Issue.find();
      console.log(issues);
      return res.status(200).json(issues);
    } catch (error) {
      console.error("Error fetching issues:", error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;