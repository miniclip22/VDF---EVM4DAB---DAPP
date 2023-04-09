const OrganisationFactory = artifacts.require("OrganisationFactory");
const Organisation = artifacts.require("Organisation");
const Device = artifacts.require("Device");
const ParkingService = artifacts.require("ParkingService");

module.exports = async function (deployer, network, accounts) {
  const mercedesAccount = accounts[0];
  const parkingAccount = accounts[1];
  const userAccount = accounts[2];

  const mercedesRes = await setUpMercedes(
    deployer,
    mercedesAccount,
    parkingAccount,
    userAccount
  );
  console.log("merceRes: ", mercedesRes);
  const parkingRes = await setUpParking(
    deployer,
    mercedesAccount,
    parkingAccount,
    userAccount,
    mercedesRes.factoryAddress
  );
  await performParking(
    parkingRes.serviceAddress,
    parkingRes.armBarrierAddress,
    mercedesRes.mercedesDeviceAddress,
    userAccount
  );
};

async function setUpMercedes(
  deployer,
  mercedesAccount,
  parkingAccount,
  userAccount
) {
  console.log("Mercedes Setup: Create and Deploy Organisation Factory");
  await deployer.deploy(OrganisationFactory, { from: mercedesAccount });
  const factory = await OrganisationFactory.deployed();

  console.log(`Factory deployed at ${factory.address}`);

  console.log("Mercedes Setup: Create Mercedes Organisation");
  const tx = await factory.createNewOrganisation(
    "Mercedes",
    "Mercedes",
    ["Corda-ID"],
    { from: mercedesAccount }
  );
  const receipt = await tx.receipt;
  const organisationCreatedEvent = receipt.logs.find(
    (log) => log.event === "OrganisationCreated"
  );
  const organisations = await factory.getOrganisations();
  const mercedesAddress = organisations[0];

  console.log(
    `Mercedes Setup: Organisation Create With Address: ${mercedesAddress}`
  );
  console.log("Mercedes Setup: Load Mercedes Organisation");
  const mercedes = await Organisation.at(mercedesAddress);
  console.log("Mercedes Setup: Loaded Mercedes Organisation");
  console.log("Mercedes Setup: Creating New Device Via Mercedes Organisation");

  const deviceTx = await mercedes.registerDevice({ from: mercedesAccount });
  const deviceReceipt = await deviceTx.receipt;
  const deviceCreatedEvent = deviceReceipt.logs.find(
    (log) => log.event === "DeviceCreated"
  );
  const devices = await mercedes.getDevices();
  const mercedesDeviceAddress = devices[0];

  console.log(
    `Mercedes Setup: Created New Device Via Mercedes Organisation With Address: ${mercedesDeviceAddress}`
  );
  console.log("Mercedes Setup: Load Mercedes Device");
  const carDevice = await Device.at(mercedesDeviceAddress);
  console.log("Mercedes Setup: Loaded Mercedes Device");

  const associationTx = await mercedes.associateUserToDevice(
    mercedesDeviceAddress,
    userAccount,
    { from: mercedesAccount }
  );
  console.log(
    `Mercedes Setup: Associate User With Address ${userAccount} to Mercedes Device With Address ${mercedesDeviceAddress}`
  );
  const isUserOfDevice = await carDevice.isUserOfDevice(userAccount);
  console.log(`Mercedes Setup: Checking Association`);

  console.log(`${userAccount} should be true: ${isUserOfDevice}`);
  const notUserOfDevice = await carDevice.isUserOfDevice(parkingAccount);
  console.log(`${parkingAccount} should be false: ${notUserOfDevice}`);
  return {
    factoryAddress: factory.address,
    mercedesDeviceAddress: mercedesDeviceAddress,
  };
}

async function setUpParking(
  deployer,
  mercedesAccount,
  parkingAccount,
  userAccount,
  factoryAddress
) {
  console.log("Parking Setup: Attaching To Existing Factory");
  const factory = await OrganisationFactory.at(factoryAddress);

  console.log("Parking Setup: Create Parking Organisation");
  try {
    const tx = await factory.createNewOrganisation(
      "Parking",
      "Parking",
      ["Corda-ID-PARKING"],
      { from: parkingAccount }
    );
    const receipt = tx.receipt;
  } catch (e) {
    console.error(e);
  }
  const organisations = await factory.getOrganisations();
  const parkingAddress = organisations[1];

  console.log(
    `Parking Setup: Organisation Create With Address: ${parkingAddress}`
  );
  console.log("Parking Setup: Load Parking Organisation");
  const parking = await Organisation.at(parkingAddress);
  console.log("Parking Setup: Loaded Parking Organisation");
  console.log("Parking Setup: Creating New Device Via Parking Organisation");

  const deviceTx = await parking.registerDevice({ from: parkingAccount });
  const deviceReceipt = deviceTx.receipt;
  const devices = await parking.getDevices();
  const parkingDeviceAddress = devices[0];

  console.log(
    `Parking Setup: Created New Device Via Parking Organisation With Address: ${parkingDeviceAddress}`
  );
  console.log("Parking Setup: Load Parking Device");
  const carDevice = await Device.at(parkingDeviceAddress);
  console.log("Parking Setup: Loaded Parking Device");

  console.log("Parking Setup: Creating Parking Service");
  const serviceTx = await parking.registerService(1, { from: parkingAccount });
  const serviceReceipt = serviceTx.receipt;
  const services = await parking.getServices();
  const parkingServiceAddress = services[0];

  console.log(
    `Parking Setup: Parking Service Create At Address ${parkingServiceAddress}`
  );
  console.log(`Parking Setup: Loading Parking Service`);
  const parkingService = await ParkingService.at(parkingServiceAddress);
  console.log(`Parking Setup: Loaded Parking Service`);
  console.log(`Parking Setup: Allowing Parking Device To Use Service`);
  const allowDeviceTx = await parkingService.allowDeviceToUseService(
    parkingDeviceAddress,
    { from: parkingAccount }
  );
  console.log(
    `Parking Setup: Allowing Devices From Mercedes Organisation ${organisations[0]} To Use Parking Service`
  );
  const allowOrganisationTx =
    await parkingService.allowOrganisationToUseService(organisations[0], {
      from: parkingAccount,
    });

  return {
    serviceAddress: parkingServiceAddress,
    armBarrierAddress: parkingDeviceAddress,
  };
}

async function performParking(
  serviceAddress,
  armBarrierAddress,
  mercedesDeviceAddress,
  userAccount
) {
  console.log(`Parking Setup: Initiating Parking`);
  const parkingService = await ParkingService.at(serviceAddress);

  console.log(`Parking Setup: Starting Session`);
  const sessions = await parkingService.openSession(
    armBarrierAddress,
    mercedesDeviceAddress,
    { from: userAccount }
  );
  const receipt = sessions.receipt;
  console.log(`Parking Setup: Waiting For Receipt.`);
  const openSessionEvent = sessions.logs.find(
    (log) => log.event === "OpenSession"
  );
  const sessionHash = openSessionEvent.args.sesssionHash;
  console.log(`Parking Setup: Session HASH ${sessionHash}.`);

  const session = await parkingService.getSession(sessionHash);
  console.log(session);
}
