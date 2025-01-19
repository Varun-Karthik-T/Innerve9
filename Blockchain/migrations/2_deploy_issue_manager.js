const IssueManager = artifacts.require("IssueManager");

module.exports = async function (deployer) {
  // Deploy the IssueManager contract
  await deployer.deploy(IssueManager);
};
