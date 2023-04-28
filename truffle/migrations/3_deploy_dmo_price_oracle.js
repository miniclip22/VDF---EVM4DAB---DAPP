// 3_deploy_dmo_price_oracle.js

const DMOPriceOracle = artifacts.require("DMOPriceOracle");

module.exports = function (deployer) {
    deployer.deploy(DMOPriceOracle);
};
