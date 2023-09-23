# Cycloid/Vodafone Parking Scenario DApp - README.md

Welcome to the Cycloid/Vodafone Parking Scenario DApp. This DApp allows users to interact with a decentralized parking
management system using Ethereum-based smart contracts.

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
managing parking spaces. It uses [Ganache](https://www.trufflesuite.com/ganache) for local development and testing,
and [Truffle](https://www.trufflesuite.com/truffle) as a development framework for building, testing, and deploying the
smart contracts.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.1.5 or higher)
- [Metamask](https://metamask.io/)
- A .env file in the **truffle** with the following keys:
    - **PRIVATE_KEYS**: an array of private Ethereum account keys that will be used to sign transactions when deploying
      and/or testing
    - **TRUFFLE_PROVIDER_URL**: the URL of the EVM chain to be used. Can be Ethereum mainnet, testnet, etc. By default,
      it
      should be "https://vodafone-testnet.nodereal.io"

**Note**: The private keys provided should be from accounts that have been already funded on the chain of choice.

Example of the .env file can be found in the file **.env.example** in the **truffle** folder.

### Install Dependencies

```bash
cd client && npm install && cd ../truffle && npm install && cd ../
```

#### Install Ganache and Truffle

```bash
npm install -g truffle ganache
```

## Commands

Some commands below require a network suffix to work properly. These are marked with <network_id> that is defined in the file **truffle-config.js** at the **truffle** folder. In this project, the two possible values are: vodafone and ganache.

Example:

```bash
truffle migrate --network ganache
```

or

```bash 
truffle migrate --network vodafone
```

**Note**: if running with the ganache network, the default port as defined in **trufle-config.js** is 7545 and should have the **network_id** of 1337.

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
