const Device = artifacts.require("Device");

contract("Device", (accounts) => {
  let device;
  const owner = accounts[0];
  const user = accounts[1];

  beforeEach(async () => {
    device = await Device.new({ from: owner });
  });

  xit("should be locked by default", async () => {
    const isLocked = await device.islocked();
    assert.isTrue(isLocked);
  });

  xit("should be unlockable", async () => {
    await device.unlock({ from: owner });
    const isLocked = await device.islocked();
    assert.isFalse(isLocked);
  });

  xit("should not be lockable if it's already locked", async () => {
    await device.unlock({ from: owner });
    await device.lock({ from: owner });
    try {
      await device.lock({ from: owner });
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.include(err.message, "Already Locked");
    }
  });

  xit("should not be unlockable if it's already unlocked", async () => {
    try {
      await device.unlock({ from: owner });
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.include(err.message, "Already Unlocked");
    }
  });

  xit("should not be assignable by non-owner", async () => {
    try {
      await device.assignUser(user, { from: user });
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.include(err.message, "revert");
    }
  });

  xit("should be assignable by owner", async () => {
    await device.assignUser(user, { from: owner });
    const isUser = await device.isUserOfDevice(user);
    assert.isTrue(isUser);
  });

  xit("should not be removable by non-owner", async () => {
    await device.assignUser(user, { from: owner });
    try {
      await device.removeUser({ from: user });
      assert.fail("Expected error not thrown");
    } catch (err) {
      assert.include(err.message, "revert");
    }
  });

  xit("should be removable by owner", async () => {
    await device.assignUser(user, { from: owner });
    await device.removeUser({ from: owner });
    const isUser = await device.isUserOfDevice(user);
    assert.isFalse(isUser);
  });
});
