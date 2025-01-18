const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const cors = require("cors");
const Issue = require("./models/Issue");
const Counter = require("./models/Counter"); 
const IssueChain = require("./tests/issueFunctions");

const getTender = require("./routes/tenders"); 
const getContract = require("./routes/contracts");
const addContract = require("./routes/addContract");
const updateContract = require("./routes/updateContract");
const getVotes = require("./routes/getVotes");
const getContractById = require("./routes/getContractById");
const getIssue = require("./routes/getIssues");
const getVoteStatus = require("./routes/get-voteStatus");
const vote = require("./routes/vote");

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
app.use("/issues", getIssue);
app.use("/", getVoteStatus);
app.use("/vote", vote);

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
 
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
