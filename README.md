## deVote - blockchain based voting system for pull requests

deVote is a browser extension for decentralised voting of pull requests in GitHub repositories. For the decentralisation of the voting mechanism, smart contracts are used, which run on the Ethereum blockchain or an Ethereum testnet. This project was developed as part of the university course *"Kryptographie und Systemsicherheit"* at the [University of Flensburg](https://hs-flensburg.de/).

## Architecture

## Deployment

## Documentation

A detailed documentation about deVote its functionalities, workflows and states can be found under the *Wiki*-Tab. It is highly suggested to read it before any development to understand the current state of the application.

#### Browser extension

#### Smart contract

As described in the chapter *Architecture*, there are two different types smart contracts that deVote uses. There is one parent contract (manager contract) and several child contracts (poll contracts). The manager contract must be created manually once and the poll contracts are published by deVote. The process of publishing the manager contract and the necessary configuration for the poll contracts are explained below.

Important system requirements are:
* [NodeJS](https://nodejs.org/) - JavaScript runtime for the npm packages
* [truffle](https://github.com/trufflesuite/truffle) - development environment framework for Ethereum

The following steps will explain how the manager contract can be deployed and how the bytecode for the poll contracts can be extracted. The extracted bytecode is required for 


## Credits and Lecture

In addition to [@sebastiangajek](https://github.com/sebastiangajek) help and support, the following resources helped us a lot to realise this project.

* [POA - Part 1 - Develop and deploy a smart contract](https://kauri.io/#article/549b50d2318741dbba209110bb9e350e)
* [Using Web3.js to Deploy Smart Contracts on Moonbeam](https://docs.moonbeam.network/getting-started/local-node/web3-js/web3-contract/)
