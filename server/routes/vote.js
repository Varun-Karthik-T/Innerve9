const router = require('express').Router();
const Issue = require('../models/Issue');
const UserIssue = require('../models/UserIssue');

router.post("/", async (req, res) => {
    try {
      const { issueId, userId, voteType } = req.body;
      console.log("POST /vote", { issueId, userId, voteType });
  
      const issue = await Issue.findOne({ id: issueId });
      if (!issue) {
        return res.status(404).json({ error: "Issue not found" });
      }
      console.log(issue.approval);
  
      const update = {};
      if (voteType === "approve") {
        update.approval = issue.approval + 1;
      } else if (voteType === "deny") {
        update.denial = issue.denial + 1;
      } else {
        return res.status(400).json({ error: "Invalid vote type" });
      }
  
      await Issue.updateOne({ id: issueId }, update);
      console.log("Updated issue:", update);
  
      const temp = Issue.find();
  
      await UserIssue.collection.insertOne({ userId, issueId, voted: voteType });
  
      return res.status(200).json({ message: "Vote recorded successfully" });
    } catch (error) {
      console.error("Error submitting vote:", error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;