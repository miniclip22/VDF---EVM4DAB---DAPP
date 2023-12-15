// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld {
    // Event declaration
    event MessageEvent(string message);

    // Function to emit the event with the provided message and return the message
    function emitMessage(string calldata message) external returns (string memory) {
        emit MessageEvent(message);
        return message;
    }
}
