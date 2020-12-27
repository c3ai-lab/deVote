const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Compile contract
const contractPath = path.resolve(__dirname, 'PollManager.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const input = {
   language: 'Solidity',
   sources: {
      'PollManager.sol': {
         content: source,
      },
   },
   settings: {
      outputSelection: {
         '*': {
            '*': ['*'],
         },
      },
   },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['PollManager.sol']['PollManager'];
module.exports = contractFile;