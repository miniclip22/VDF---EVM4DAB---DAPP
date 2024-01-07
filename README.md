# Cycloid/Vodafone Parking Scenario DApp - README.md

Welcome to the Cycloid/Vodafone Parking Scenario DApp. This DApp facilitates user interaction with a decentralized
parking management system, utilizing Ethereum-based smart contracts.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Install Dependencies](#install-dependencies)
    - [Install Ganache and Truffle](#install-ganache-and-truffle)
- [Commands](#commands)
    - [Compile Solidity Smart Contracts](#compile-solidity-smart-contracts)
    - [Test Solidity Smart Contracts](#test-solidity-smart-contracts)
    - [Migrate Solidity Smart Contracts](#migrate-solidity-smart-contracts)
    - [Run Dev Server](#run-dev-server)
    - [Build for Production](#build-for-production)
- [Configure New EVM-Compatible Chains](#configure-new-evm-compatible-chains)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

## Introduction

The Cycloid/Vodafone Parking Scenario DApp is a decentralized application that leverages Ethereum smart contracts for
efficient management of parking spaces. It employs [Ganache](https://www.trufflesuite.com/ganache) for local development
and testing, along with [Truffle](https://www.trufflesuite.com/truffle) as the development framework for building,
testing, and deploying smart contracts and the [Sepolia Testnet](https://sepolia.etherscan.io/) for deploying them.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.1.5 or higher)
- [Metamask](https://metamask.io/)
- A .env file in the **truffle** directory with the following keys:
    - **PRIVATE_KEYS**: An array of private Ethereum account keys for signing transactions during deployment and
      testing.
    - **TRUFFLE_PROVIDER_URL**: The URL of the EVM chain to be used, which can be Ethereum mainnet, testnet, etc. By
      default, it should be "https://vodafone-testnet.nodereal.io"

**Note**: The private keys should belong to accounts already funded on the chosen chain. Refer to the **.env.example**
file in the **truffle** folder for an example.

### Install Dependencies

```bash
cd client && npm install && cd ../truffle && npm install && cd ../
```
#### Install Ganache and Truffle

```bash
npm install -g truffle ganache
```

## Commands

Some commands below require a network suffix to work properly. These are marked with `<network_id>` that is defined in
the file **truffle-config.js** at the **truffle** folder. In this project, the three possible values are: vodafone,
ganache and sepolia.

Example:

```bash
truffle migrate --network ganache
```

or

```bash
truffle migrate --network vodafone
```

or for the Sepolia Testnet:

```bash
truffle migrate --network sepolia
```

**Note**: if running with the ganache network, the default port as defined in **truffle-config.js** is 7545 and should
have the **network_id** of 1337.

### Compile Solidity Smart Contracts

```bash
cd truffle && truffle compile
```

### Test Solidity Smart Contracts

```bash
cd truffle && truffle test --network <network_id>
```

### Migrate Solidity Smart Contracts

```bash
cd truffle && truffle migrate --network <network_id>
```

### Run Dev Server

```bash
cd client && npm run start
```

### Build for Production

```bash
cd client && npm run build
```

## Configure New EVM-Compatible Chains

To adapt the Cycloid/Vodafone Parking Scenario DApp for a new EVM-compatible chain, follow these steps:

1. **JSON-RPC Endpoint**: Ensure the new chain is accessible via a JSON-RPC endpoint. This is an interface for
   interacting with the blockchain using the JSON-RPC protocol, typically over HTTP or WebSocket connections.
2. **Update the `.env` File**: Modify the `.env` file in the **truffle** folder to replace the `TRUFFLE_PROVIDER_URL`
   with the new chain's JSON-RPC endpoint URL.

   ```bash
   TRUFFLE_PROVIDER_URL=<new_chain_json_rpc_endpoint>
   ```

   Substitute `<new_chain_json_rpc_endpoint>` with the actual URL for the new chain.

Examples for different chains:

- Ganache: `TRUFFLE_PROVIDER_URL=http://localhost:7545`
- Vodafone: `TRUFFLE_PROVIDER_URL=https://vodafone-testnet.nodereal.io`
- Sepolia Ethereum testnet (via
  the [Infura mode-as-a-service](https://infura.io/)): `TRUFFLE_PROVIDER_URL=https://sepolia.infura.io/v3/`

**Note:** The Sepolia Ethereum RPC assumes you are using the Infura node-as-a-service. If not, you will have to
configure a local, Ethereum Sepolia Testnet node and link its URL here.

**Note 2:** If using infura node-as-a-service, also add the `INFURA_API_KEY` to the **.env** file, which should be
obtained by setting up an account on Infura.

## Troubleshooting

If you encounter issues during installation, configuration, or usage, try the following steps:

1. Double-check the `.env` file for any errors or missing information.
2. Ensure that your Node.js version is compatible (v18.1.5 or higher).
3. Verify that your private keys are valid and associated with funded accounts on the chosen EVM-compatible chain.
4. Confirm that the `truffle-config.js` file contains the correct settings for the chosen EVM-compatible chain, such as
   gas prices and gas limits.
5. Check the official documentation for Ganache, Truffle, or the EVM-compatible chain for additional troubleshooting
   tips.
6. If you are still experiencing issues, consider searching for similar issues on the project's GitHub Issues page or
   creating a new issue with a detailed description of the problem.

### Invalid Opcode - Deployment on Ganache

When deploying any smart contract on Ganache, the following error might appear:

```<smart contract name> hit an invalid opcode while deploying. Try:
   * Verifying that your constructor params satisfy all assert conditions.
   * Verifying your constructor code doesn't access an array out of bounds.
   * Adding reason strings to your assert statements.
```

This is due to the Ethereum Shanghai upgrade introducing a new EVM Opcode: ```0x5f PUSH0```
that does not exist on Ganache (yet).

See: https://ethereum.stackexchange.com/questions/151650/invalid-opcode-in-smart-contract-solidity-while-using-ganache-cli
and: https://ethereum.stackexchange.com/questions/155718/invalid-opcode-while-deploying-helloworld

To solve this, there are too ways:

- **Option 1**: In file `trufflle-config.js`, manually update the **solc** object to include a lower solidity version:

```jsonc
{
  "solc": {
    "version": "0.8.19", // Fetch exact version from solc-bin (default: truffle's version)
    "settings": {
      "optimizer": {
        "enabled": true,
        "runs": 200
      }
    }
  }
}
```

In the example above, the solidity version was downgraded to **0.8.19**.
Also change the solidity version at the top of the file from each smart contract to the one specified above in the *
*truffle-config.js** file.

Before:
```pragma solidity ^0.8.23;``` (or whatever solidity version the smart contracts have been compiled with)

after:
```pragma solidity <<solidity version specified in truffle-config.js>>;```

example: ```pragma solidity ^0.8.19;```

- **Option 2 - RECOMMENDED**: **DO NOT** use Ganache. Instead, use the Truffle command:

```bash 
truffle develop
```

then, run the deploying command as usual: ```truffle deploy```
or ```truffle test``` to run our Unit/E2E tests.

## Contributing

We welcome contributions to the Cycloid/Vodafone Parking Scenario DApp. To contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your fork of the repository locally.
3. Create a new branch for your feature or bugfix.
4. Make changes, add tests if applicable, and commit your changes to the branch.
5. Push the branch to your fork on GitHub.
6. Create a pull request against the original repository, providing a detailed description of the changes and the
   purpose of the contribution.

Please follow established coding standards and conventions within the project, and ensure that your changes do not
introduce new issues or break existing functionality.

## License

This project is proprietary and all rights reserved. Unauthorized copying, distribution, modification, or use of any
part of this project without express written permission from the copyright holder is strictly prohibited. For more
information, please contact the copyright holder.

## Contact Information

If you have questions or need additional support, please feel free to reach out to the project maintainers
at [duarte.teles@innowave.tech](mailto:duarte.teles@innowave.tech).







