# Cycloid/Vodafone Parking Scenario DApp - README.md

Welcome to the Cycloid/Vodafone Parking Scenario DApp.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.1.5 or higher)
- [Metamask](https://metamask.io/)
- A .env file on the root on the project with the following keys:
  - **PRIVATE_KEYS**: an array of private Ethereum account keys that will be used to sign transactions when deploying
    and/or testing
  - **TRUFFLE_PROVIDER_URL**: the URL of the EVM chain to be used. Can be Ethereum mainnet, testnet, etc. By default, it
    should be "https://vodafone-testnet.nodereal.io"

Note: the private keys provided should be from accounts that have been already funded on the chain of choice. By
default, the DApp assumes the accounts supplied here are connecting to the Vodafone NodeReal EVM-Compatible chain
and are properly funded (https://vodafone-testnet-faucet.nodereal.io/).

Example of the .env file can be found on file **.env.example** in the root of the project.

### Install dependencies

```bash
 cd client && npm install && cd ../truffle && npm install && cd ../
```

### Install Ganache and Truffle

```bash
npm install -g truffle ganache
````

## Commands

### Compile Solidity Smart Contracts

```bash
cd truffle && truffle compile
````

### Test Solidity Smart Contracts

```bash
cd truffle && truffle test
```

### Migrate Solidity Smart Contracts

```bash
cd truffle && truffle migrate
```

### Run Dev Server

```bash
cd client && npm run start
```

### Build for Production

```bash
cd client && npm run build
```

### Configure New EVM-Compatible Chains
