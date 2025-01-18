const router = require('express').Router();
const UserIssue = require("../models/UserIssue");

router.get("/vote-status", async (req, res) => {
    try {
      const { userId, issueId } = req.query;
      console.log("GET /vote-status", { userId, issueId });
  
      const userIssue = await UserIssue.findOne({ userId, issueId });
      console.log(userIssue.voted);
      if (!userIssue.voted) {
        return res.status(200).json({ voted: null });
      }
  
      return res.status(200).json({ voted: userIssue.voted });
    } catch (error) {
      console.error("Error fetching vote status:", error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;