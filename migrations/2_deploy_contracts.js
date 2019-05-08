const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const RandomNumberGenerator = artifacts.require("RandomNumberGenerator");
const RandomNumberGenerator2 = artifacts.require("RandomNumberGenerator2");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(RandomNumberGenerator);
  deployer.deploy(RandomNumberGenerator2);
};
