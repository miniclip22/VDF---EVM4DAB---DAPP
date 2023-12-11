// 5_deploy_hello_dab.js

/**
 * @class HelloDab
 * @classdesc Represents the contract artifact for the HelloDab smart contract.
 * @memberof artifacts
 * @requires truffle-artifacts
 */
const HelloDab = artifacts.require("HelloDab");

module.exports = function (deployer) {
    deployer.deploy(HelloDab);
};

