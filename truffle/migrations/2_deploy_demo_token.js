// 2_deploy_demo_token.js

const DemoToken = artifacts.require("DemoToken");

module.exports = function (deployer) {
    deployer.deploy(DemoToken);
};

