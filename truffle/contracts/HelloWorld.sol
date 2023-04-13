// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract HelloWorld {
    string public message;
    event HelloWorld(string message);

    constructor() {
        message = "Hello World";
    }

    function sayHelloWorld() public returns (string memory) {
        emit HelloWorld(message);
        return message;
    }
}
