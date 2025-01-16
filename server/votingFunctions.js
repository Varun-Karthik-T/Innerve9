const Web3 = require('web3');
const VotingSystem = require('../dapp/build/contracts/VotingSystem.json');
require('dotenv').config();

const { VOTING_CONTRACT_ADDRESS } = process.env;
// Set up web3 provider (e.g., local Ganache instance or Infura for a public network)
const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your provider URL

// Get the contract ABI and address
const abi = VotingSystem.abi;
const contractAddress = VOTING_CONTRACT_ADDRESS; // Replace with your deployed contract address

// Create a contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to create a spend
async function createSpend(spendDetails, account) {
  try {
    const tx = await contract.methods.createSpend(spendDetails.spendId, spendDetails.reason).send({ from: account, gas: 3000000 });

    console.log("Spend created:", tx.events.SpendCreated.returnValues);
    return tx.events.SpendCreated.returnValues;
  } catch (error) {
    console.error("Error creating spend:", error);
    throw error;
  }
}

// Function to vote on a spend
async function voteOnSpend(spendId, approvalVotes, denialVotes, totalVotes, account) {
  try {
    const tx = await contract.methods.voteOnSpend(spendId, approvalVotes, denialVotes, totalVotes).send({ from: account, gas: 3000000 });

    console.log("Spend voted:", tx.events.SpendVoted.returnValues);
    return tx.events.SpendVoted.returnValues;
  } catch (error) {
    console.error("Error voting on spend:", error);
    throw error;
  }
}

// Function to fetch a spend by spendId
async function fetchSpend(spendId) {
  try {
    const spend = await contract.methods.getSpendById(spendId).call();
    console.log("Fetched spend:", spend);
    return spend;
  } catch (error) {
    console.error("Error fetching spend:", error);
    throw error;
  }
}

module.exports = {
  createSpend,
  voteOnSpend,
  fetchSpend
};