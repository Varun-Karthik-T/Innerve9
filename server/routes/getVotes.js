const router  = require("express").Router();
const Issue = require("../models/Issue");

router.get("/getVotes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("GET /getVotes", { id });
  
      const issue = await Issue.findOne({ id });
      if (!issue) {
        return res.status(404).json({ error: "Issue not found" });
      }
  
      return res.status(200).json({
        issueId: issue.id,
        approval: issue.approval,
        denial: issue.denial,
      });
    } catch (error) {
      console.error("Error fetching issue votes:", error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;