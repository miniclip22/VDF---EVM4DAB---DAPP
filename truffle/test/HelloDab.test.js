// test/HelloDab.test.js

const { expect } = require("chai");
const HelloDab = artifacts.require("HelloDab");

contract("HelloDab", function (accounts) {
    let helloDab;
    const owner = accounts[0];

    beforeEach(async function () {
        helloDab = await HelloDab.new();
    });

    describe("sayHello", function () {
        it("Should emit HelloEvent with correct values", async function () {
            const message = "Hello, World!";

            const result = await helloDab.sayHello(message, { from: owner });
            const helloEvent = result.logs[0];
            const helloEventSender = helloEvent.args[0];
            const helloEventMessage = helloEvent.args[1];

            expect(helloEvent.event).to.equal("HelloEvent");
            expect(helloEventSender).to.equal(owner);
            expect(helloEventMessage).to.equal(message);
        });
    });
});
