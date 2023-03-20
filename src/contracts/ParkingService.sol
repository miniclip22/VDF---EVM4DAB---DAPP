// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "./Organisation.sol";
import "./Device.sol";

contract ParkingService {
    address owner;
    uint rate;
    mapping(address => bool) isArmDevice;
    mapping(address => bool) organisationsThatCanUseService;
    mapping(bytes32 => ParkingSession) identifierToSession;

    struct ParkingSession {
        uint rate;
        uint startedAtBlock;
        address user;
        address car;
        address organisation;
        address armDevice;
    }

    event OpenSession(
        address indexed user,
        address indexed armBarrier,
        uint blockNumber,
        bytes32 sesssionHash
    );
    event CloseSession(
        address indexed user,
        address indexed armBarrier,
        uint blockNumber
    );

    constructor(uint _rate) {
        owner = msg.sender;
        rate = _rate;
    }

    function allowDeviceToUseService(address armDeviceAddress) external {
        isArmDevice[armDeviceAddress] = true;
    }

    function allowOrganisationToUseService(
        address organisationAddress
    ) external {
        organisationsThatCanUseService[organisationAddress] = true;
    }

    function openSession(address armBarrier, address carAddress) external {
        // Check if the address of the arm barrier is associated to this service. The arm barrier address is going to be in the QR code we assume.
        require(isArmDevice[armBarrier]);
        // The user trying to use this must be associated to a device that belongs to the organisation that are allowed to use this service.
        // User address
        address caller = msg.sender;
        // Car address.
        Device car = Device(carAddress);
        // From the car we want to check that the user is associated with this car and that the car belongs to the organisations that can use this service
        require(car.isUserOfDevice(caller)); // if the caller is not the user of device this will stop execution
        // Check if the car owner(organisation) is allowed to use this service.
        require(organisationsThatCanUseService[car.owner()]);

        // If we passed this we can then create the charging session and record it locally
        ParkingSession memory s = ParkingSession(
            rate,
            block.number,
            msg.sender,
            address(car),
            car.owner(),
            armBarrier
        );
        bytes32 sessionHash = keccak256(
            abi.encodePacked(
                s.rate,
                s.startedAtBlock,
                s.user,
                s.car,
                s.organisation,
                s.armDevice
            )
        );
        identifierToSession[sessionHash] = s;
        emit OpenSession(msg.sender, armBarrier, block.number, sessionHash);
    }

    function getSession(
        bytes32 sessionId
    ) external view returns (ParkingSession memory) {
        return identifierToSession[sessionId];
    }

    function closeSessionUser(bytes32 sessionID) external payable {
        ParkingSession memory s = identifierToSession[sessionID];
        // get specific block by number
        // get the timestamp
        // get the current timestamp

        emit CloseSession(s.user, s.armDevice, block.number);
        delete identifierToSession[sessionID];
    }

    function closeSessionDevice(bytes32 sessionID) external payable {
        ParkingSession memory s = identifierToSession[sessionID];
        // get specific block by number
        // get the timestamp
        // get the current timestamp

        emit CloseSession(s.user, s.armDevice, block.number);
        delete identifierToSession[sessionID];
    }
}