require("dotenv").config();
const Web3 = require("web3");
const fs = require("fs");

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.PROJECT_CONTRACT_ADDRESS;

const contractAbi = JSON.parse(
  fs.readFileSync("./../Blockchain/build/contracts/Project.json", "utf-8")
).abi;

const web3 = new Web3(rpcUrl);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contract = new web3.eth.Contract(contractAbi, contractAddress);

console.log("Connected account:", account.address);


async function submitProject(bid) {
  try {
    const receipt = await contract.methods
      .submitBid(
        bid.contractorId,
        bid.organisationChain,
        bid.referenceId,
        bid.bidAmount,
        bid.panelId
      )
      .send({ from: account.address, gas: 3000000 });

    console.log("Bid submitted successfully. Transaction hash:", receipt.transactionHash);
  } catch (error) {
    console.error("Error submitting bid:", error.message);
  }
}


async function getProject(contractorId, referenceId) {
  try {
    const bid = await contract.methods.getBid(contractorId, referenceId).call();
    console.log("Bid Details:", {
      contractorId: bid[0],
      organisationChain: bid[1],
      referenceId: bid[2],
      bidAmount: bid[3],
      panelId: bid[4],
    });
  } catch (error) {
    console.error("Error retrieving bid:", error.message);
  }
}

(async () => {
  console.log("Starting interaction with the ProjectBidding contract...");


  await submitProject({
    contractorId: "contractor123",
    organisationChain: "OrgChain1",
    referenceId: "project456",
    bidAmount: 100000,
    panelId: 2,
  });


  await getProject("contractor123", "project456");
})();


module.exports = { submitProject, getProject };