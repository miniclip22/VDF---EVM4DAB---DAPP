pragma solidity ^0.8.18;

contract HelloWorld {
    string public message;

    constructor() {
        message = "Hello World";
    }

    // receive X parameters
    // deploy on a testnet

    function sayHelloWorld() public view returns (string memory) {
        return message;
    }
}
