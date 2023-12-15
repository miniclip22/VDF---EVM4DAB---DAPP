// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Parking contract
/// @notice This contract represents a parking lot where cars can enter and exit, and payments can be made for parking sessions.
contract Parking {
    /// @notice An enumeration of possible states of a parking session.

    enum SessionStatus {
        INACTIVE,
        ACTIVE,
        PAYMENT_PENDING,
        COMPLETE
    }

    /// @notice A struct representing a parking session that contains information about the car, gate, and payment.
    struct ParkingSession {
        uint256 startTime;
        uint256 endTime;
        uint256 amountPaid;
        SessionStatus status;
        string gate_id;
        string gate_org;
        string car_id;
        string car_org;
        mapping(uint8 => string) tx_ids;
        uint8 tx_ids_count;
    }

    /// @notice A mapping of license plate numbers to parking sessions.
    mapping(string => ParkingSession) public parkingSessions;

    /// @notice The rate per hour for parking.
    uint256 public ratePerHour = 1;

    /// @notice An event emitted when a car enters a parking lot.
    event OpenGateEvent(
        string indexed gate_id,
        uint256 indexed startTime,
        string indexed tx_id
    );
    /// @notice An event emitted when a payment is due for a parking session.
    event Payable(
        string car_id,
        string gate_id,
        string car_org,
        string gate_org,
        uint256 cost,
        string VDF,
        string description,
        string licence_plate,
        string tx_id,
        string function_name
    );
    /// @notice An event emitted when a payment is received for a parking session.
    event PaymentReceived(
        string indexed licence_plate,
        uint256 amount,
        uint256 timestamp,
        string indexed tx_id
    );

    /// @notice Starts a parking session for a car entering a parking lot.
    /// @dev Emits the OpenGateEvent event.
    /// @param gate_id The ID of the gate where the car entered.
    /// @param gate_org The organization that owns the gate where the car entered.
    /// @param car_id The ID of the car.
    /// @param car_org The organization that owns the car.
    /// @param licence_plate The license plate number of the car.
    /// @param tx_id The ID of the transaction that opened the gate.
    function startParkingSession(
        string memory gate_id,
        string memory gate_org,
        string memory car_id,
        string memory car_org,
        string memory licence_plate,
        string memory tx_id
    ) external {
        require(
            parkingSessions[licence_plate].status != SessionStatus.ACTIVE,
            "Parking session already active."
        );

        ParkingSession storage session = parkingSessions[licence_plate];
        session.startTime = block.timestamp;
        session.endTime = 0;
        session.amountPaid = 0;
        session.status = SessionStatus.ACTIVE;
        session.gate_id = gate_id;
        session.gate_org = gate_org;
        session.car_id = car_id;
        session.car_org = car_org;
        session.tx_ids[session.tx_ids_count++] = tx_id;
        // Emit the OpenGateEvent event
        emit OpenGateEvent(
            gate_id,
            parkingSessions[licence_plate].startTime,
            tx_id
        );
    }

    /// @notice Ends a parking session for a car leaving a parking lot.
    /// @param licence_plate The license plate number of the car.
    /// @param gate_id The ID of the gate where the car exited.
    /// @param car_id The ID of the car.
    /// @param gate_organisation_id The organization that owns the gate where the car exited.
    /// @param car_organisation_id The organization that owns the car.
    /// @param tx_id The ID of the transaction that closed the gate.
    /// @param endTime The timestamp of the end of the parking session.
    function endParkingSession(
        string memory licence_plate,
        string memory gate_id,
        string memory car_id,
        string memory gate_organisation_id,
        string memory car_organisation_id,
        string memory tx_id,
        uint256 endTime
    ) external {
        require(
            parkingSessions[licence_plate].status == SessionStatus.ACTIVE,
            "No active parking session found."
        );

        require(
            keccak256(
                abi.encodePacked(parkingSessions[licence_plate].gate_id)
            ) == keccak256(abi.encodePacked(gate_id)),
            "Incorrect gate_id."
        );
        require(
            keccak256(
                abi.encodePacked(parkingSessions[licence_plate].car_id)
            ) == keccak256(abi.encodePacked(car_id)),
            "Incorrect car_id."
        );
        require(
            keccak256(
                abi.encodePacked(parkingSessions[licence_plate].gate_org)
            ) == keccak256(abi.encodePacked(gate_organisation_id)),
            "Incorrect gate_organisation_id."
        );
        require(
            keccak256(
                abi.encodePacked(parkingSessions[licence_plate].car_org)
            ) == keccak256(abi.encodePacked(car_organisation_id)),
            "Incorrect car_organisation_id."
        );
        parkingSessions[licence_plate].tx_ids[
        parkingSessions[licence_plate].tx_ids_count++
        ] = tx_id;
        parkingSessions[licence_plate].endTime = endTime;
        parkingSessions[licence_plate].status = SessionStatus.PAYMENT_PENDING;
        uint256 cost = estimateOwedAmount(licence_plate);
        emit Payable(
            car_id,
            gate_id,
            car_organisation_id,
            gate_organisation_id,
            cost,
            "GBP",
            string(
                abi.encodePacked(
                    "Payment Pending for car with licence plate ",
                    licence_plate
                )
            ),
            licence_plate,
            tx_id,
            "finalize_flow"
        );
    }

    /// @notice Finalizes a parking session by processing a payment.
    /// @param licence_plate The license plate number of the car.
    /// @param amount The amount paid for the parking session.
    /// @param tx_id The ID of the transaction that processed the payment.

    function finalize_flow(
        string memory licence_plate,
        uint256 amount,
        string memory tx_id
    ) external {
        ParkingSession storage session = parkingSessions[licence_plate];
        require(
            session.status == SessionStatus.PAYMENT_PENDING,
            "No payment pending parking session found."
        );

        uint256 amountDue = estimateOwedAmount(licence_plate);
        require(amount >= amountDue, "Insufficient payment amount.");

        session.amountPaid += amount;
        session.status = SessionStatus.COMPLETE;
        session.tx_ids[session.tx_ids_count++] = tx_id;

        emit PaymentReceived(licence_plate, amount, block.timestamp, tx_id);
    }

    /// @notice Estimates the cost of a parking session based on its duration.
    /// @param licence_plate The license plate number of the car.
    /// @return The estimated cost of the parking session.
    function estimateOwedAmount(
        string memory licence_plate
    ) public view returns (uint256) {
        require(parkingSessions[licence_plate].startTime > 0);

        require(
            parkingSessions[licence_plate].status ==
            SessionStatus.PAYMENT_PENDING,
            "Parking session not ended."
        );

        uint256 parkingDurationInSeconds = parkingSessions[licence_plate]
            .endTime - parkingSessions[licence_plate].startTime;
        uint256 parkingDurationInHours = parkingDurationInSeconds / 3600;

        if (parkingDurationInSeconds % 3600 > 0) {
            parkingDurationInHours += 1;
        }

        // Ensure a minimum charge of one hour
        if (parkingDurationInHours == 0) {
            parkingDurationInHours = 1;
        }

        uint256 amountDue = parkingDurationInHours * ratePerHour;
        return amountDue;
    }

    /// @notice Processes a payment for a parking session using an ERC20 token.
    /// @param licence_plate The license plate number of the car.
    /// @param tokenAddress The address of the ERC20 token to use for payment.
    /// @param amount The amount of the ERC20 token to pay.
    /// @param tx_id The ID of the transaction that processed the payment.
    function payWithERC20(
        string memory licence_plate,
        address tokenAddress,
        uint256 amount,
        string memory tx_id
    ) external {
        ParkingSession storage session = parkingSessions[licence_plate];
        require(
            session.status == SessionStatus.PAYMENT_PENDING,
            "No payment pending parking session found."
        );

        uint256 amountDue = estimateOwedAmount(licence_plate);
        require(amount >= amountDue, "Insufficient payment amount.");

        session.amountPaid += amount;
        session.tx_ids[session.tx_ids_count++] = tx_id;
        session.status = SessionStatus.COMPLETE;
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);

        emit PaymentReceived(licence_plate, amount, block.timestamp, tx_id);
    }

    /// @notice Processes a payment for a parking session using native currency.
    /// @param licence_plate The license plate number of the car.
    /// @param tx_id The ID of the transaction that processed the payment.
    function payWithNative(
        string memory licence_plate,
        string memory tx_id
    ) external payable {
        ParkingSession storage session = parkingSessions[licence_plate];
        require(
            session.status == SessionStatus.PAYMENT_PENDING,
            "No payment pending parking session found."
        );

        uint256 amountDue = estimateOwedAmount(licence_plate);
        require(msg.value >= amountDue, "Insufficient payment amount.");

        session.amountPaid += msg.value;
        session.status = SessionStatus.COMPLETE;
        if (msg.value > amountDue) {
            uint256 change = msg.value - amountDue;
            payable(msg.sender).transfer(change);
        }
        session.tx_ids[session.tx_ids_count++] = tx_id;

        emit PaymentReceived(licence_plate, msg.value, block.timestamp, tx_id);
    }

    /// @notice Updates the rate per hour for parking.
    /// @param newRate The new rate per hour.
    function updateRatePerHour(uint256 newRate) external {
        ratePerHour = newRate;
    }
}
