// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract HelloDab {
    event HelloEvent(address indexed caller, string message);

    function sayHello(string memory message) public {
        emit HelloEvent(msg.sender, message);
    }
}
