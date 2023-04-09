// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "./Device.sol";
import "./IOrganisation.sol";
import "./ParkingService.sol";

contract Organisation is IOrganisation {
    string identifier;
    string organisationName;
    string[] alternativeIds;
    address owner;
    Device[] public devices;
    ParkingService[] services;

    struct OwnedDevices {
        address deviceAddress;
        address userAddress;
        bool isLocked;
    }

    constructor(
        string memory _identifier,
        string memory _organisationName,
        string[] memory _alternativeIds,
        address _owner
    ) {
        identifier = _identifier;
        organisationName = _organisationName;
        alternativeIds = _alternativeIds;
        owner = _owner;
    }

    function registerDevice() external onlyOwner returns (address) {
        Device d = new Device();
        devices.push(d);
        emit DeviceCreated(address(this), address(d));
        return address(d);
    }

    function lockDevice(address device) external {
        Device d = Device(device);
        d.lock();
    }

    function unlockDevice(address device) external {
        Device d = Device(device);
        d.unlock();
    }

    function associateUserToDevice(
        address deviceAddress,
        address userAddress
    ) external {
        Device d = Device(deviceAddress);
        d.assignUser(userAddress);
    }

    function removeUserAssociation(address deviceAddress) external {
        Device d = Device(deviceAddress);
        d.removeUser();
    }

    function getDevices() public view returns (Device[] memory) {
        return devices;
    }

    function viewOwner() public view returns (address) {
        return owner;
    }

    function registerService(uint rate) external {
        ParkingService p = new ParkingService(rate);
        services.push(p);
        emit ServiceRegistered(address(this), address(p));
    }

    function getServices() public view returns (ParkingService[] memory) {
        return services;
    }

    event DeviceCreated(
        address indexed organisationAddress,
        address indexed deviceAddress
    );
    event DeviceRemoved(
        address indexed organisationAddress,
        address indexed deviceAddress
    );

    event ServiceRegistered(
        address indexed organisationAddress,
        address indexed serviceAddress
    );

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
