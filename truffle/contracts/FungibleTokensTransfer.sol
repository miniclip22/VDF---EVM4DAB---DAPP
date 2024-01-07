// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./DMOPriceOracle.sol";
import "./DemoToken.sol";

contract FungibleTokenTransfer {
    DMOPriceOracle public priceOracle;
    DemoToken public demoToken;

    constructor(address _oracle, address _token) {
        priceOracle = DMOPriceOracle(_oracle);
        demoToken = DemoToken(_token);
    }

    function calculatePriceAndTransfer(uint256 _amount) public {
        uint256 dmoPrice = priceOracle.getDMOPrice();
        uint256 amountToTransfer = dmoPrice * _amount;
        demoToken.transferFrom(msg.sender, address(this), amountToTransfer);
    }
}
