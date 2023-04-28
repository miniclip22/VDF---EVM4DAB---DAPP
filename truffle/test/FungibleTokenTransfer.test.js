// test/FungibleTokenTransfer.test.js

const { expect } = require("chai");
const DMOPriceOracle = artifacts.require("DMOPriceOracle");
const DemoToken = artifacts.require("DemoToken");
const FungibleTokenTransfer = artifacts.require("FungibleTokenTransfer");

contract("FungibleTokenTransfer", function (accounts) {
    let dmoPriceOracle, demoToken, fungibleTokenTransfer;
    const [owner, addr1, addr2] = accounts;

    beforeEach(async function () {
        dmoPriceOracle = await DMOPriceOracle.new();
        demoToken = await DemoToken.new();
        fungibleTokenTransfer = await FungibleTokenTransfer.new(dmoPriceOracle.address, demoToken.address);
    });

    it("Should initialize contracts with correct addresses", async function () {
        expect(await fungibleTokenTransfer.priceOracle()).to.equal(dmoPriceOracle.address);
        expect(await fungibleTokenTransfer.demoToken()).to.equal(demoToken.address);
    });

    it("Should correctly calculate price and transfer tokens", async function () {
        const amount = 100;
        const dmoPrice = (await dmoPriceOracle.getDMOPrice()).toNumber();
        const amountToTransfer = dmoPrice * amount;

        // Approve fungibleTokenTransfer to spend tokens on behalf of owner
        await demoToken.approve(fungibleTokenTransfer.address, amountToTransfer, { from: owner });

        const ownerInitialBalance = (await demoToken.balanceOf(owner)).toNumber();
        const contractInitialBalance = (await demoToken.balanceOf(fungibleTokenTransfer.address)).toNumber();

        await fungibleTokenTransfer.calculatePriceAndTransfer(amount, { from: owner });

        const ownerFinalBalance = (await demoToken.balanceOf(owner)).toNumber();
        const contractFinalBalance = (await demoToken.balanceOf(fungibleTokenTransfer.address)).toNumber();

        expect(ownerFinalBalance).to.equal(ownerInitialBalance - amountToTransfer);
        expect(contractFinalBalance).to.equal(contractInitialBalance + amountToTransfer);
    });
});
