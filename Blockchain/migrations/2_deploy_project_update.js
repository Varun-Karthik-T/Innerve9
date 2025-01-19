const ProjectUpdate = artifacts.require("ProjectUpdate");

module.exports = function (deployer) {
  deployer.deploy(ProjectUpdate)
    .then(() => {
      console.log("ProjectUpdate contract deployed successfully!");
    })
    .catch((err) => {
      console.error("Error deploying ProjectUpdate contract:", err);
    });
};
