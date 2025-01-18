const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const cors = require("cors");
const payment = require("./models/Payment");
const Issue = require("./models/Issue");
const UserIssue = require("./models/UserIssue");
const Counter = require("./models/Counter"); 
const IssueChain = require("./tests/issueFunctions");

const getTender = require("./routes/tenders"); 
const getContract = require("./routes/contracts");
const addContract = require("./routes/addContract");
const updateContract = require("./routes/updateContract");
const getVotes = require("./routes/getVotes");
const getContractById = require("./routes/getContractById");

const PORT = process.env.PORT || 4000; 
const HOST = "0.0.0.0";

app.use(bodyParser.json());
app.use(cors());

const dbName = 'contracts';
connectDB(dbName);

app.use("/tenders", getTender);
app.use("/contracts", getContract);
app.use("/addContract", addContract);
app.use("/updateContract", updateContract);
app.use("/", getVotes);
app.use("/", getContractById);

app.post("/govcontract", async (req, res) => {
  try { 
    const govContract = new payment(req.body);
    await govContract.save();
    res.status(201).json(govContract);
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
});

app.post("/issues", async (req, res) => {
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
 
app.get("/issues", async (req, res) => {
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

app.post("/vote", async (req, res) => {
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

app.get("/vote-status", async (req, res) => {
  try {
    const { userId, issueId } = req.query;
    console.log("GET /vote-status", { userId, issueId });

    // Find the user-issue mapping
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

app.use("/*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
