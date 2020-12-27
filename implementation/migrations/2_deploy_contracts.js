var Voting = artifacts.require("./Voting.sol");
var Incrementer = artifacts.require("./Incrementer.sol");
var PollManager = artifacts.require("./PollManager.sol");
var Poll = artifacts.require("./Poll.sol");

module.exports = function(deployer) {
  deployer.deploy(PollManager);
  deployer.deploy(Poll);
};