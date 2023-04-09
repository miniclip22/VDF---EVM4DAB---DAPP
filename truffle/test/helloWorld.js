const HelloWorldContract = artifacts.require("HelloWorld");
const assert = require("assert");
require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.TRUFFLE_PROVIDER_URL)
);
web3.eth.setProvider(Web3.givenProvider);

contract("HelloWorld", function (accounts) {
  let helloWorldContractInstance;

  // define contract address

  beforeEach(async () => {
    helloWorldContractInstance = await HelloWorldContract.deployed();
  });
  xit("should return Hello World!", async () => {
    const contractMessage = await helloWorldContractInstance.sayHelloWorld();
    assert.equal(
      contractMessage,
      "Hello World",
      "Hello World! was not returned"
    );
  });
});
