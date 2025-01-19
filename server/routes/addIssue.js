const router = require("express").Router();
const Issue = require("../models/Issue");
const Counter = require("../models/Counter");
const { addIssue } = require("../web3/issue");

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

    await addIssue({
      id: issue.id,
      issue_type: issue.issue_type,
      description: issue.description,
      date_of_complaint: issue.date_of_complaint,
      status: issue.status,
      latitude: issue.location.latitude,
      longitude: issue.location.longitude,
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
