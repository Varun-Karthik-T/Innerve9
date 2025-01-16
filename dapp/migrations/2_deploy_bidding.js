const approvedContract = artifacts.require("approvedContract");

module.exports = function (deployer) {
  deployer.deploy(approvedContract, {
    gas: 2000000, // Lower gas limit
    gasPrice: 1000000000 // Lower gas price (1 gwei)
  });
};