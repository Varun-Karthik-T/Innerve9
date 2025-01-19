const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const cors = require("cors");

const getTender = require("./routes/tenders"); 
const getContract = require("./routes/contracts");
const addContract = require("./routes/addContract");
const updateContract = require("./routes/updateContract");
const getVotes = require("./routes/getVotes");
const getContractById = require("./routes/getContractById");
const getIssue = require("./routes/getIssues");
const getVoteStatus = require("./routes/get-voteStatus");
const vote = require("./routes/vote");
const addIssue = require("./routes/addIssue");

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
app.use("/issues", addIssue);      
 
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
