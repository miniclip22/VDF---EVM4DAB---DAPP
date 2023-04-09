// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Device {
    bool private locked = true;
    address public owner;
    address user;

    constructor() {
        owner = msg.sender;
    }

    function lock() external {
        require(!locked, "Already Locked");
        locked = true;
    }

    function unlock() external {
        require(locked, "Already Unlocked");
        locked = false;
    }

    function islocked() external view returns (bool) {
        return locked;
    }

    function assignUser(address _user) external {
        user = _user;
    }

    function removeUser() external {
        user = address(0);
    }

    function isUserOfDevice(address _user) external view returns (bool) {
        return _user == user;
    }
}
