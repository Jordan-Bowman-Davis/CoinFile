const fs = require('fs');
const Web3 = require('web3');

// Read the signed transaction from a file
const filename = 'signed_transaction.trns';
const rawTx = JSON.parse(fs.readFileSync(filename));

// Set up Web3 provider for connecting to a remote node
// Ganache default is http://localhost:8545
const providerUrl = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// Send the signed transaction
web3.eth.sendSignedTransaction(rawTx.rawTransaction)
  .on('receipt', (receipt) => {
    console.log(`Transaction confirmed: ${receipt.transactionHash}`);
  })
  .on('error', (error) => {
    console.error(error);
  });