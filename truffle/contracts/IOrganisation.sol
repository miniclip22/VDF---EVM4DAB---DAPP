// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

/**
 * @dev Interface of the Organisation standard on the EVM Network
 */
interface IOrganisation {
    /*
     * Register a device to this organisation
     */
    function registerDevice() external returns (address);

    /**
     * Lock a specific device so it can't be used for transactions
     */

    function lockDevice(address device) external;

    /**
     * Unlock Device
     */
    function unlockDevice(address device) external;

    /**
     * Associate a device to used
     */

    function associateUserToDevice(
        address deviceAddress,
        address userAddress
    ) external;

    /**
     * Create service
     */

    function registerService(uint rate) external;

    // /**
    //  * Top up a device with the native token
    //  */

    // function fundDevice(address device) external;
}
