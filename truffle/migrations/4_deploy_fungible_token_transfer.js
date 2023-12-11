// 4_deploy_fungible_token_transfer.js

const FungibleTokenTransfer = artifacts.require("FungibleTokenTransfer");
const DMOPriceOracle = artifacts.require("DMOPriceOracle");
const DemoToken = artifacts.require("DemoToken");

module.exports = async function (deployer, network, accounts) {
    // Replace these addresses with the deployed addresses of DMOPriceOracle and DemoToken contracts
    // ! Only run this migration after the DMOPriceOracle and DemoToken contracts have been deployed
    const oracleAddress = "0x123..."; // DMOPriceOracle contract address
    const tokenAddress = "0x456..."; // DemoToken contract address

    // ! Uncomment this when the DMOPriceOracle and DemoToken contracts have been deployed
    // await deployer.deploy(FungibleTokenTransfer, oracleAddress, tokenAddress);
};

