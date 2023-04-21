// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "./Organisation.sol";

contract OrganisationFactory {
    event OrganisationCreated(address indexed organisationAddress);
    Organisation[] _organisations;

    function createNewOrganisation(
        string calldata identifier,
        string calldata customerName,
        string[] calldata alternativeIds
    ) public returns (address) {
        Organisation o = new Organisation(
            identifier,
            customerName,
            alternativeIds,
            msg.sender
        );

        _organisations.push(o);
        emit OrganisationCreated(address(o));
        return address(o);
    }

    function getOrganisations() public view returns (Organisation[] memory) {
        return _organisations;
    }
}
