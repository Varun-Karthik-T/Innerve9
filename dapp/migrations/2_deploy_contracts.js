const IssueManagement = artifacts.require("IssueManagement");

module.exports = function (deployer) {
  deployer.deploy(IssueManagement, {
    gas: 2000000, // Lower gas limit
    gasPrice: 1000000000 // Lower gas price (1 gwei)
  });
};