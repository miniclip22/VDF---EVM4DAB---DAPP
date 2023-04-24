// 5_deploy_hello_dab.js

const HelloDab = artifacts.require("HelloDab");

module.exports = function (deployer) {
    deployer.deploy(HelloDab);
};
