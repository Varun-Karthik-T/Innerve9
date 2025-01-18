const router = require("express").Router();
const Issue = require("../models/Issue");
const Counter = require("../models/Counter"); 
const IssueChain = require("../tests/issueFunctions");

router.post("/", async (req, res) => {
    try {
      const issue = req.body;
      console.log("POST /issues", issue);
  
      const counter = await Counter.findByIdAndUpdate(
        { _id: "issueId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
  
      issue.id = counter.seq;
  
      const newIssue = new Issue(issue);
      await newIssue.save();
      
  await IssueChain.createIssue({
      issueId: issue.id,
      issueName: issue.issue_type,
      description: issue.description,
      dateOfComplaint: issue.date_of_complaint,
      approval: issue.approval,
      denial: issue.denial,
      accuracy: Math.floor(80),
      altitude: Math.floor(0),
      latitude: Math.floor(issue.location.latitude * 1000000),
      longitude: Math.floor(issue.location.longitude * 1000000)
  }, process.env.ACCOUNT_ADDRESS).then((res) => {
      console.log("Issue added to chain successfully");
  }).catch((error) => {
      console.log("Error adding issue in ConTrack Network:", error);
      return res.status(500).json({ error: error.message });
  });
      return res
        .status(201)
        .json({ message: "Issue created successfully", issue: newIssue });
    } catch (error) {
      console.error("Error creating issue:", error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;