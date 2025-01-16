const { createSpend, voteOnSpend, fetchSpend } = require('./votingFunctions');
require('dotenv').config();

const { ACCOUNT_ADDRESS } = process.env;

async function main() {
  const spendDetails = {
    spendId: 42,
    reason: "Initial raw materials"
  };

  const account = ACCOUNT_ADDRESS;
  // Create a spend
  const createdSpend = await createSpend(spendDetails, account);
  console.log("Created Spend:", createdSpend);


  const approvalVotes = 60;
  const denialVotes = 40;
  const totalVotes = 100;

  const votedSpend = await voteOnSpend(createdSpend.spendId, approvalVotes, denialVotes, totalVotes, account);
  console.log("Voted Spend:", votedSpend);


  const fetchedSpend = await fetchSpend(createdSpend.spendId);
  console.log("Fetched Spend:", fetchedSpend);
}

main().catch(console.error);