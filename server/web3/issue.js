require("dotenv").config();
console.log("RPC_URL:", process.env.RPC_URL);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);
console.log("ISSUE_CONTRACT_ADDRESS:", process.env.ISSUE_CONTRACT_ADDRESS);

const Web3 = require("web3");
const fs = require("fs");

const rpcUrl =
process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.ISSUE_CONTRACT_ADDRESS;


const contractAbi = JSON.parse(
  fs.readFileSync("../Blockchain/build/contracts/IssueManager.json")
).abi;

const web3 = new Web3(rpcUrl); 


const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;


const contract = new web3.eth.Contract(contractAbi, contractAddress);

console.log("Connected account:", account.address);


async function addIssue(issue) {
  const scaledLatitude = Math.round(issue.latitude * 10000); 
  const scaledLongitude = Math.round(issue.longitude * 10000);
  try {
    const receipt = await contract.methods
      .createIssue(
        issue.id,
        issue.issue_type,
        issue.description,
        issue.date_of_complaint,
        issue.status,
        scaledLatitude,
        scaledLongitude
      )
      .send({ from: account.address, gas: 3000000 });

    if (receipt.events.IssueCreated) {
      console.log("Issue added successfully. Transaction hash:", receipt.transactionHash);
    } else {
      console.error("Error: Issue already exists.");
    }
  } catch (error) {
    console.error("Error adding issue:", error.message);
  }
}

// Function to retrieve an issue
async function getIssue(issueId) {
  try {
    const issue = await contract.methods.getIssue(issueId).call();
    console.log("Issue Details:", {
      id: issue[0],
      issue_type: issue[1],
      description: issue[2],
      date_of_complaint: issue[3],
      status: issue[4],
      latitude: issue[5] / 10000, 
      longitude: issue[6] / 10000
    });
  } catch (error) {
    console.error("Error retrieving issue:", error.message);
  }
}

module.exports = { addIssue, getIssue };
