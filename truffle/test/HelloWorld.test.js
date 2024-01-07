const HelloWorldContract = artifacts.require("HelloWorld");
const assert = require("assert");

contract("HelloWorld", function (accounts) {
    let helloWorldContractInstance;

    beforeEach(async () => {
        helloWorldContractInstance = await HelloWorldContract.deployed();
    });

    it("should return the sent message", async () => {
        const testMessage = "Hello World";
        const response = await helloWorldContractInstance.emitMessage(testMessage);

        // Extract the return value from the transaction response
        const contractMessage = response.receipt.logs[0].args.message;

        assert.equal(
            contractMessage,
            testMessage,
            `${testMessage} was not returned`
        );
    });
});
