const SimpleStorage = artifacts.require("SimpleStorage");
const RandomNumberGenerator = artifacts.require("RandomNumberGenerator");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(RandomNumberGenerator);
};
