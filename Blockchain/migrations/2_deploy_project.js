const Project = artifacts.require("Project");

module.exports = function (deployer) {

  deployer.deploy(Project)
    .then(() => {
      console.log("Project contract deployed successfully!");
    })
    .catch((err) => {
      console.error("Error deploying Project contract:", err);
    });
};
