const SimpleStorage = artifacts.require("SimpleStorage");
const RandomNumberGenerator = artifacts.require("RandomNumberGenerator");
const Lottery = artifacts.require("Lottery");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(RandomNumberGenerator);
  deployer.deploy(Lottery);
};
