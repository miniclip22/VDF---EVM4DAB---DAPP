# Cycloid/Vodafone Parking Scenario DApp - README.md

Welcome to the Cycloid/Vodafone Parking Scenario DApp. This DApp allows users to interact with a decentralized parking
management system using Ethereum-based smart contracts.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Install Dependencies](#install-dependencies)
    - [Install Ganache and Truffle](#install-ganache-and-truffle)
      [Contributing](#contributing)
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
