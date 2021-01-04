## deVote - blockchain based voting system for pull requests

deVote is a browser extension for decentralised voting of pull requests in GitHub repositories. For the decentralisation of the voting mechanism, smart contracts are used, which run on the Ethereum blockchain or an Ethereum testnet. This project was developed as part of the university course *"Kryptographie und Systemsicherheit"* at the [University of Flensburg](https://hs-flensburg.de/).

## Documentation

A detailed documentation about deVote its functionalities, workflows and states can be found under the *Wiki*-Tab. It is highly suggested to read it before any development to understand the current state of the application.

## Architecture

## Get started

#### Browser extension

#### Smart contract

As described in the chapter *Architecture*, there are two different types smart contracts that deVote uses. There is one parent contract (manager contract) and several child contracts (poll contracts). The manager contract must be created manually once and the poll contracts are published by deVote. The process of publishing the manager contract and the necessary configuration for the poll contracts are explained below.
**Important: This steps are only required to do, if you change anything in the solidity contracts!**

Important system requirements are:
* [NodeJS](https://nodejs.org/) - JavaScript runtime for the npm packages
* [truffle](https://github.com/trufflesuite/truffle) - development environment framework for Ethereum

The following descriptions will explain how the manager contract can be deployed and how the bytecode for the poll contracts can be extracted. The extracted bytecode is required for deployment of the poll contract through deVote. If the solidity smart contract changes the bytecode needs to be updated.

**Deploy the manager contract**

* Switch in the folder *implementation* and run the following truffle deploy command:

```javascript
truffle migrate --reset
```

* This will iniate the deployment process and after some time (1 - 2 minutes) the console should show the information about the deployed contract

```solidity
2_deploy_contracts.js
=====================

   Replacing 'PollManager'
   -----------------------
   > transaction hash:    0x7e71c2432e9b0087e9f0da426cfc2a699848ca2c9052770575d07edc5926c421
   > Blocks: 1            Seconds: 4
   > contract address:    0x97A97215cAD2733Bac9A377a31ED89395B7f17C7
   > block number:        18696961
   > block timestamp:     1609732725
   > account:             0x28CfbA097FF9bb9D904471c493b032Df45B9f953
   > balance:             836.382794882999015
   > gas used:            524483 (0x800c3)
   > gas price:           1 gwei
   > value sent:          0 ETH
   > total cost:          0.000524483 ETH
```

* The row *contract address* is the address of the newly deployed contract. Copy it and update the variable *manager_contract_address* in *popup.js*.

## Credits and Lecture

In addition to [@sebastiangajek´s](https://github.com/sebastiangajek) help and support, the following resources helped us a lot to realise this project.

* [POA - Part 1 - Develop and deploy a smart contract](https://kauri.io/#article/549b50d2318741dbba209110bb9e350e)
* [Using Web3.js to Deploy Smart Contracts on Moonbeam](https://docs.moonbeam.network/getting-started/local-node/web3-js/web3-contract/)
