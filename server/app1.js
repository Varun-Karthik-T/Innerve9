const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const cors = require("cors");
const Contract = require("./models/Contract");
const Tender = require("./models/Tender");
const payment = require("./models/Payment");
const Issue = require("./models/Issue");
const UserIssue = require("./models/UserIssue");
const Counter = require("./models/Counter"); 
const IssueChain = require("./tests/issueFunctions");

const getTender = require("./routes/tenders"); 

const PORT = process.env.PORT || 4000; 
const HOST = "0.0.0.0";

app.use(bodyParser.json());
app.use(cors());

const dbName = 'contracts';
connectDB(dbName);

app.use("/tenders", getTender);

app.post("/govcontract", async (req, res) => {
  try { 
    const govContract = new payment(req.body);
    await govContract.save();
    res.status(201).json(govContract);
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
});

app.get("/govcontract/:referenceId", async (req, res) => {
  try {
    const { referenceId } = req.params;
    const govContracts = await payment.find({ referenceId, status: false });
    res.json(govContracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.get("/contracts", async (req, res) => {
//   try {
//     const contracts = await Contract.find();
//     res.json(contracts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.put("/payments", async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log("status", status);
    console.log("id", id);
    const booleanStatus = status === "true" || status === true; 
    const updatedPayment = await payment.findByIdAndUpdate(
      id,
      { status: booleanStatus },
      { new: true }
    );
    return res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post("/issues", async (req, res) => {
  try {
    const issue = req.body;
    console.log("POST /issues", issue);

    // Get the next sequence value for the id
    const counter = await Counter.findByIdAndUpdate(
      { _id: "issueId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Set the id field to the next sequence value
    issue.id = counter.seq;

    // Insert the new issue
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

    // Fetch all issues
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

    // Find the issue by its id field
    const issue = await Issue.findOne({ id: issueId });
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    console.log(issue.approval);

    // Update the approval or denial count
    const update = {};
    if (voteType === "approve") {
      update.approval = issue.approval + 1;
    } else if (voteType === "deny") {
      update.denial = issue.denial + 1;
    } else {
      return res.status(400).json({ error: "Invalid vote type" });
    }

    // Update the issue
    await Issue.updateOne({ id: issueId }, update);
    console.log("Updated issue:", update);

    // Create a new UserIssue mapping
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


app.get("/getVotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("GET /issue-votes", { id });

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

app.post("/updateContract", async (req, res) => {
  try {
    const { contractorId, referenceId, bidAmount, amountUsed, selectedOption, paymentMade, status } = req.body;

    if (!contractorId || !referenceId) {
      return res.status(400).json({ error: "contractorId and referenceId are required" });
    }

    const existingContract = await Contract.findOne({ referenceId });
    if (!existingContract) {
      return res.status(404).json({ error: "Contract with this referenceId not found" });
    }

    if (existingContract.contractorId !== contractorId) {
      return res.status(403).json({ error: "Invalid contractorId for this referenceId" });
    }

    const newPayment = new payment({
      referenceId,
      contractorId,
      bidAmount: bidAmount || existingContract.bidAmount,
      amountUsed: amountUsed,
      selectedOption: selectedOption,
      paymentMade: paymentMade, 
      status: status, 
    });

    await newPayment.save();

    return res.status(201).json({
      message: "Payment created successfully for the contract",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error updating contract:", error);
    res.status(500).json({ error: "Failed to create payment for the contract" });
  }
});


app.post("/addContract", async (req, res) => {
  try {
    const { contractorId, organisationChain, referenceId, bidAmount, panelid } = req.body;

    if (!contractorId || !organisationChain || !referenceId || !bidAmount || !panelid) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingContract = await Contract.findOne({ referenceId });
    if (existingContract) {
      return res.status(400).json({ error: "Contract with this referenceId already exists" });
    }

    const newContract = new Contract({
      contractorId,
      organisationChain,
      referenceId,
      bidAmount,
      panelid,
    });

    await newContract.save();

    return res.status(201).json({
      message: "Contract added successfully",
      contract: newContract,
    });
  } catch (error) {
    console.error("Error adding contract:", error);
    res.status(500).json({ error: "Failed to add contract" });
  }
});


app.use("/*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
