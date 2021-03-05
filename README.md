## deVote - a blockchain-based voting system for pull requests

deVote is a browser extension for decentralized voting of pull requests in GitHub repositories. For the decentralization of the voting mechanism, smart contracts are used, which run on the Ethereum blockchain or an Ethereum test net. This project was developed as part of the university course *"Kryptographie und Systemsicherheit"* at the [University of Flensburg](https://hs-flensburg.de/).

## Documentation

A detailed documentation about deVote and its functionalities, workflows and states can be found under the *Wiki*-Tab. It is highly suggested to read the wiki pages and to understand how the application works.

## Architecture

<p align="center">
  <img src="https://github.com/c3ai-lab/Pull-Request-Extension-Voting/blob/main/implementation/assets/deVote_architecture.png" width="750">  
</p>


## Development & Installation

### Browser extension

The browser extension is under *implementation/extension*. You can add them to the chrome browser by going to the Extensions settings, clicking on *"Load unzipped extension"* in the upper left corner and selecting the path in the Explorer/Finder. You can find more information at [Install and manage extensions](https://support.google.com/chrome_webstore/answer/2664769?hl=en).

### GitHub OAuth

deVote uses GitHub OAuth to authenticate an GitHub account. In order to use GitHub's OAuth, the app must be registered under your own account. The procedure for this process can be found under [GitHub OAuth Documentation](https://docs.github.com/en/free-pro-team@latest/developers/apps/getting-started-with-apps).
After the registration of the app, you will get the client_id and client_secret. Copy them and update the variables *client_id* and *client_secret* with your app properties. After this, you need to update the *Callback URL* in the settings of your GitHub-App. The *Callback URL* should have the following structure
*https://[EXTENSION-ID].chromiumapp.org/provider_cb*. You can find the extension ID by clicking on details in the extensions settings. **This is only for testing purposes, you should not reveal your client_id and client_secret!** One option would be to use something like a nodeJS service, that holds this sensible information and has an endpoint (REST) that redirects to the Callback-URL.

### GitHub Developer token
For some functionalities (merge/reject of pull requests) deVote needs access rights, which the normal OAuth token unfortunately does not offer, therefore the developer token must also be stored in the app, which is done via an user interface view. How to get the developer token can be found under ["Creating a personal access token"](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

### Smart contract

As described in the chapter *Architecture*, there are two different types of smart contracts that deVote uses. There is one parent contract (manager contract) and several child contracts (poll contracts). The manager contract must be created manually once and the poll contracts are published by deVote. The process of publishing the manager contract and the necessary configuration for the poll contracts are explained below.
**Important: These steps are only required to do if you change anything in the solidity contracts!**

Important system requirements are:
* [NodeJS](https://nodejs.org/) - JavaScript runtime for the npm packages
* [truffle](https://github.com/trufflesuite/truffle) - development environment framework for Ethereum

The following descriptions will explain how the manager contract can be deployed and how the bytecode for the poll contracts can be extracted. The extracted bytecode is required for the deployment of the poll contract through deVote. If the solidity smart contract changes the bytecode needs to be updated.

**Deploy the manager contract**

* Switch in the directory *implementation* and run the following truffle deploy command:

```shell
truffle migrate --reset
```

* This will initiate the deployment process and after some time (1 - 2 minutes) the console should show the information about the deployed contract

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

**Extract poll contract bytecode**

* Switch in the directory *implementation/contracts* and run the command to extract the bytecode:

```shell
node solidity_poll.js 
```

* The console should then print out the bytecode of the contract

```shell
608060405234801561001057600080fd5b5060006040518060800160405280600081526020016001151581526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020155505061039d806101186000396000f3fe60806040526004361061003f5760003560e01c8063267e6529146100445780635ab77cb31461006f5780635df81330146100a757806361ebccfd14610123575b600080fd5b34801561005057600080fd5b5061005961017d565b6040518082815260200191505060405180910390f35b6100a56004803603604081101561008557600080fd5b810190808035906020019092919080359060200190929190505050610189565b005b3480156100b357600080fd5b506100e0600480360360208110156100ca57600080fd5b8101908080359060200190929190505050610212565b6040518085815260200184151581526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b61017b6004803603606081101561013957600080fd5b8101908080351515906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061027c565b005b60008080549050905090565b6000828154811061019657fe5b906000526020600020906003020160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561020d573d6000803e3d6000fd5b505050565b6000818154811061021f57fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006040518060800160405280600080549050815260200185151581526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020155505050505056fea2646970667358221220a2e63af99aae6a38190a0a194bce878f250938496b597e4fbcb80b800cab721b64736f6c63430007010033
```

* Copy it and update the variable *bytecode* in *popup.js*.

**Update the contract json(s)**

* The *web3.js* package requires the contract json(s) of the manager- and poll contract to interact with them. The json(s) are basically an interface for the package to know what functions the contracts have. Just copy the *abi* attribute out of *implementation/build/contracts/PollManager.json* and print it into
the variable *manager_contract_abi* in contract.js. The same applies for *implementation/build/contracts/Poll.json* and *poll_contract_abi*.


## Credits and Lecture

In addition to [@sebastiangajek´s](https://github.com/sebastiangajek) help and support, the following resources helped us a lot to realise this project.

* [POA - Part 1 - Develop and deploy a smart contract](https://kauri.io/#article/549b50d2318741dbba209110bb9e350e)
* [Using Web3.js to Deploy Smart Contracts on Moonbeam](https://docs.moonbeam.network/getting-started/local-node/web3-js/web3-contract/)
* [Install and manage extensions](https://support.google.com/chrome_webstore/answer/2664769?hl=en)
* [Managing OAuth Apps](https://docs.github.com/en/free-pro-team@latest/developers/apps/getting-started-with-apps)

Human-Icons are open-source and from [undraw]( https://undraw.co/).
