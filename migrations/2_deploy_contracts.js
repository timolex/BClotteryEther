const RandomNumberGenerator = artifacts.require("RandomNumberGenerator");
const Lottery = artifacts.require("Lottery");

module.exports = function(deployer) {
  deployer.deploy(RandomNumberGenerator);
  deployer.deploy(Lottery);
};
