// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract DMOPriceOracle {
    address public owner;
    uint256 public price;

    constructor() {
        owner = msg.sender;
        price = 2;
    }

    function updatePrice(uint256 _price) public {
        require(msg.sender == owner, "Only owner can update price");
        price = _price;
    }

    function getDMOPrice() public view returns (uint256) {
        return price;
    }
}
