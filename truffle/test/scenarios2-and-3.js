const Web3 = require("web3");
require("dotenv").config();
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.TRUFFLE_PROVIDER_URL)
);
web3.eth.setProvider(Web3.givenProvider);

contract("Transfer Ether", function () {
  // Scenario 2
  const cordaSender = "0x4858d3E1ae140F3897657922D72c3C35e800Ed60";
  const cordaReceiver = "0xC7FdA6c07C6ff2A093d11bf71C95CDca7b139680";
  // Amount in Ether
  const cordaAmount = 2;

  // Scenario 3
  const cordaAddress = cordaSender;

  xit("should return a valid account balance - scenario 3", async () => {
    const cordaAddressBalance = await web3.eth.getBalance(cordaAddress);
    const etherValue = Web3.utils.fromWei(cordaAddressBalance, "ether");

    console.log(
      `Corda account address: ${cordaAddress} has balance: ${etherValue} (eth)`
    );

    expect(Number(etherValue)).to.be.above(0);
  });

  xit("should transfer ether successfully between two accounts supplied by the Cordapp - scenario 2", async () => {
    const cordaSenderBalanceBeforeTransfer = await web3.eth.getBalance(
      cordaSender
    );
    const cordaReceiverBalanceBeforeTransfer = await web3.eth.getBalance(
      cordaReceiver
    );

    const cordaSenderBalanceBeforeTransferEther = Web3.utils.fromWei(
      cordaSenderBalanceBeforeTransfer,
      "ether"
    );
    const cordaReceiverBalanceBeforeTransferEther = Web3.utils.fromWei(
      cordaReceiverBalanceBeforeTransfer,
      "ether"
    );
    console.log(
      `Corda sender account address: ${cordaSender} has balance: ${cordaSenderBalanceBeforeTransferEther}`
    );
    console.log(
      `Corda receiver account address: ${cordaReceiver} has balance: ${cordaReceiverBalanceBeforeTransferEther}`
    );

    expect(Number(cordaSenderBalanceBeforeTransferEther)).to.be.above(0);
    expect(Number(cordaReceiverBalanceBeforeTransferEther)).to.be.above(0);

    // Transfer ether from cordaSender to cordaReceiver
    await web3.eth.sendTransaction({
      from: cordaSender,
      to: cordaReceiver,
      value: web3.utils.toWei(cordaAmount.toString(), "ether"),
    });

    const cordaSenderBalanceAfterTransfer = await web3.eth.getBalance(
      cordaSender
    );
    const cordaReceiverBalanceAfterTransfer = await web3.eth.getBalance(
      cordaReceiver
    );

    const cordaSenderBalanceAfterTransferEther = Web3.utils.fromWei(
      cordaSenderBalanceAfterTransfer,
      "ether"
    );

    const cordaReceiverBalanceAfterTransferEther = Web3.utils.fromWei(
      cordaReceiverBalanceAfterTransfer,
      "ether"
    );

    console.log(
      `Corda sender account address: ${cordaSender} has balance after the transfer: ${cordaSenderBalanceAfterTransferEther}`
    );
    console.log(
      `Corda receiver account address: ${cordaReceiver} has balance after the transfer: ${cordaReceiverBalanceAfterTransferEther}`
    );

    expect(Number(cordaSenderBalanceAfterTransferEther)).to.be.above(0);
    expect(Number(cordaReceiverBalanceAfterTransferEther)).to.be.above(0);

    expect(Number(cordaSenderBalanceBeforeTransferEther)).to.be.above(
      Number(cordaSenderBalanceAfterTransferEther)
    );
    expect(Number(cordaReceiverBalanceBeforeTransferEther)).to.be.below(
      Number(cordaReceiverBalanceAfterTransferEther)
    );
  });
});
