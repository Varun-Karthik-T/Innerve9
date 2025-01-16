const { createIssue, fetchIssue } = require('./tests/issueFunctions');
require('dotenv').config();

const { ACCOUNT_ADDRESS } = process.env;
console.log("ACCOUNT",ACCOUNT_ADDRESS);
async function main() {
  const issueDetails = {
    issueId: 9,
    issueName: " Damage",
    description: " damage near Adyar.",
    dateOfComplaint: "2025-01-10",
    approval : 10,
    denial : 0,
    accuracy: 10,
    altitude: -63,
    latitude: 128396614,
    longitude: 801552797,
  };

  const account = ACCOUNT_ADDRESS; // Replace with your account address
  console.log("ACCOUNT:",account);
  // Create an issue
  const createdIssue = await createIssue(issueDetails, account);
  console.log("Created Issue:", createdIssue);

  // Fetch the created issue
  console.log("Fetching Issue:", createdIssue.issueId);
  const fetchedIssue = await fetchIssue(createdIssue.issueId);
  console.log("Fetched Issue:", fetchedIssue);
}

main().catch(console.error);