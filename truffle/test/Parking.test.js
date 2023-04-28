// test/Parking.test.js

const { expect } = require("chai");
const Parking = artifacts.require("Parking");
const DemoToken = artifacts.require("DemoToken");

contract("Parking", function (accounts) {
    let parking, owner, addr1, addr2, erc20Mock, tx_id;

    beforeEach(async function () {
        erc20Mock = await DemoToken.new();

        parking = await Parking.new();
        [owner, addr1, addr2] = accounts;
        await erc20Mock.transfer(addr1, 1000);

        tx_id = "sample_tx_id";
    });

    describe("startParkingSession", function () {
        it("Should start a new parking session", async function () {
            await parking.startParkingSession(
                "gate_id",
                "gate_org",
                "car_id",
                "car_org",
                "licence_plate",
                tx_id
            );

            const session = await parking.parkingSessions("licence_plate");
            expect(session.status.toNumber()).to.equal(1); // 1 corresponds to SessionStatus.ACTIVE
        });
    });

    describe("endParkingSession", function () {
        beforeEach(async function () {
            await parking.startParkingSession(
                "gate_id",
                "gate_org",
                "car_id",
                "car_org",
                "licence_plate",
                tx_id
            );
        });

        it("Should end a parking session and set status to PAYMENT_PENDING", async function () {
            await parking.endParkingSession(
                "licence_plate",
                "gate_id",
                "car_id",
                "gate_org",
                "car_org",
                tx_id,
                Math.floor(Date.now() / 1000) + 7200
            );

            const session = await parking.parkingSessions("licence_plate");
            expect(session.status.toNumber()).to.equal(2);
        });
    });

    describe("finalize_flow", function () {
        beforeEach(async function () {
            await parking.startParkingSession(
                "gate_id",
                "gate_org",
                "car_id",
                "car_org",
                "licence_plate",
                tx_id
            );
            await parking.endParkingSession(
                "licence_plate",
                "gate_id",
                "car_id",
                "gate_org",
                "car_org",
                tx_id,
                Math.floor(Date.now() / 1000) + 7200
            );
        });

        it("Should finalize a parking session and set status to COMPLETE", async function () {
            await parking.finalize_flow("licence_plate", 2, tx_id);

            const session = await parking.parkingSessions("licence_plate");
            expect(session.status.toNumber()).to.equal(3);
        });
    });

    describe("estimateOwedAmount", function () {
        beforeEach(async function () {
            await parking.startParkingSession(
                "gate_id",
                "gate_org",
                "car_id",
                "car_org",
                "licence_plate",
                tx_id
            );
            await parking.endParkingSession(
                "licence_plate",
                "gate_id",
                "car_id",
                "gate_org",
                "car_org",
                tx_id,
                Math.floor(Date.now() / 1000) + 7200
            );
        });

        it("Should estimate owed amount correctly", async function () {
            const owedAmount = await parking.estimateOwedAmount("licence_plate");
            expect(owedAmount.toNumber()).to.equal(2); // 2 hours of parking
        });
    });

    describe("payWithERC20", function () {
        beforeEach(async function () {
            await parking.startParkingSession(
                "gate_id",
                "gate_org",
                "car_id",
                "car_org",
                "licence_plate",
                tx_id
            );
            await parking.endParkingSession(
                "licence_plate",
                "gate_id",
                "car_id",
                "gate_org",
                "car_org",
                tx_id,
                Math.floor(Date.now() / 1000) + 7200
            );
        });

        it("Should pay parking fee with ERC20 and set status to COMPLETE", async function () {
            await erc20Mock.approve(parking.address, 2, { from: addr1 });
            await parking.payWithERC20("licence_plate", erc20Mock.address, 2, tx_id, { from: addr1 });

            const session = await parking.parkingSessions("licence_plate");
            expect(session.status.toNumber()).to.equal(3); // 3 corresponds to SessionStatus.COMPLETE
        });
    });

    describe("payWithNative", function () {
        beforeEach(async function () {
            await parking.startParkingSession(
                "gate_id",
                "gate_org",
                "car_id",
                "car_org",
                "licence_plate",
                tx_id
            );
            await parking.endParkingSession(
                "licence_plate",
                "gate_id",
                "car_id",
                "gate_org",
                "car_org",
                tx_id,
                Math.floor(Date.now() / 1000) + 7200
            );
        });

        it("Should pay parking fee with native currency and set status to COMPLETE", async function () {
            await parking.payWithNative("licence_plate", tx_id, { from: addr1, value: web3.utils.toWei("2", "ether") });

            const session = await parking.parkingSessions("licence_plate");
            expect(session.status.toNumber()).to.equal(3); // 3 corresponds to SessionStatus.COMPLETE
        });
    });

    describe("updateRatePerHour", function () {
        it("Should update the rate per hour", async function () {
            await parking.updateRatePerHour(5);
            const updatedRate = await parking.ratePerHour();
            expect(updatedRate.toNumber()).to.equal(5);
        });
    });

});
