require("dotenv").config();
const Web3 = require("web3");
const fs = require("fs");

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.UPDATES_CONTRACT_ADDRESS;


const contractAbi = JSON.parse(
  fs.readFileSync("./../Blockchain/build/contracts/ProjectUpdate.json", "utf-8")
).abi;

const web3 = new Web3(rpcUrl);

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contract = new web3.eth.Contract(contractAbi, contractAddress);

console.log("Connected account:", account.address);

async function addUpdate(update) {
  try {
    const receipt = await contract.methods
      .addUpdate(
        update.referenceId,
        update.contractorId,
        update.amountUsed,
        update.selectedOption,
        update.status
      )
      .send({ from: account.address, gas: 3000000 });

    console.log("Update added successfully. Transaction hash:", receipt.transactionHash);
  } catch (error) {
    console.error("Error adding update:", error.message);
  }
}

async function getUpdatesByReferenceId(referenceId) {
  try {
    const updates = await contract.methods.getUpdatesByReferenceId(referenceId).call();
    console.log("Updates for Reference ID:", referenceId);
    updates.forEach((update, index) => {
      console.log(`Update #${index + 1}:`);
      console.log({
        referenceId: update.referenceId,
        contractorId: update.contractorId,
        amountUsed: update.amountUsed,
        selectedOption: update.selectedOption,
        status: update.status,
      });
    });
  } catch (error) {
    console.error("Error retrieving updates:", error.message);
  }
}


(async () => {
  console.log("Starting interaction with the ProjectUpdate contract...");

 
  await addUpdate({
    referenceId: "PROJ12345",
    contractorId: "CONTR001",
    amountUsed: 10000,
    selectedOption: "Option A",
    status: true, 
  });

 
  await getUpdatesByReferenceId("PROJ12345");
})();

module.exports = { addUpdate, getUpdatesByReferenceId };