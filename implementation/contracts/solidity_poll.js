const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Compile contract
const contractPath = path.resolve(__dirname, 'Poll.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const input = {
   language: 'Solidity',
   sources: {
      'Poll.sol': {
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
const contractFile = tempFile.contracts['Poll.sol']['Poll'];
console.log(contractFile['evm']['bytecode']['object']);
module.exports = contractFile;