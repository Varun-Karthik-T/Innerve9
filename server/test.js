const Project = require('./tests/project');
const Web3 = require('web3');
require('dotenv').config();

const { RPC_URL } = process.env;
const web3 = new Web3(RPC_URL); 

(async () => {
  try {
    await Project.addWinner(3, 102, 40, 'Highway 278', 600, 2000000, 'Coimbatore', 'Varun', 'Karthik');
    await Project.getWinnerDetails(40);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    web3.currentProvider.disconnect();
  }
})();