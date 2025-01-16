const VotingSystem = artifacts.require("VotingSystem");

module.exports = function (deployer) {
  deployer.deploy(VotingSystem, {
    gas: 2000000, // Lower gas limit
    gasPrice: 1000000000 // Lower gas price (1 gwei)
  });
};