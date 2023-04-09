const Organisation = artifacts.require("Organisation");
const Device = artifacts.require("Device");
const ParkingService = artifacts.require("ParkingService");

contract("Organisation", (accounts) => {
  let organisationInstance;

  beforeEach(async () => {
    organisationInstance = await Organisation.new(
      "ID123",
      "My Organisation",
      ["AltID1", "AltID2"],
      accounts[0]
    );
  });

  xit("should register a device", async () => {
    const device = await organisationInstance.registerDevice();
    assert.notEqual(device, null, "Device was not registered");
  });

  xit("should lock a device", async () => {
    const device = await organisationInstance.registerDevice();
    await organisationInstance.lockDevice(device);
    const deviceInstance = await Device.at(device);
    const isLocked = await deviceInstance.islocked();
    assert.equal(isLocked, true, "Device was not locked");
  });

  xit("should unlock a device", async () => {
    const device = await organisationInstance.registerDevice();
    const deviceInstance = await Device.at(device);
    await deviceInstance.lock();
    await organisationInstance.unlockDevice(device);
    const isLocked = await deviceInstance.islocked();
    assert.equal(isLocked, false, "Device was not unlocked");
  });

  xit("should associate a user to a device", async () => {
    const device = await organisationInstance.registerDevice();
    await organisationInstance.associateUserToDevice(device, accounts[1]);
    const deviceInstance = await Device.at(device);
    const isUserOfDevice = await deviceInstance.isUserOfDevice(accounts[1]);
    assert.equal(isUserOfDevice, true, "User was not associated with device");
  });

  xit("should remove a user association from a device", async () => {
    const device = await organisationInstance.registerDevice();
    const deviceInstance = await Device.at(device);
    await deviceInstance.assignUser(accounts[1]);
    await organisationInstance.removeUserAssociation(device);
    const isUserOfDevice = await deviceInstance.isUserOfDevice(accounts[1]);
    assert.equal(
      isUserOfDevice,
      false,
      "User association was not removed from device"
    );
  });

  xit("should register a parking service", async () => {
    const rate = 100;
    const service = await organisationInstance.registerService(rate);
    assert.notEqual(service, null, "Service was not registered");
    const serviceInstance = await ParkingService.at(service);
    const actualRate = await serviceInstance.getRate();
    assert.equal(actualRate, rate, "Parking rate was not set correctly");
  });
});
