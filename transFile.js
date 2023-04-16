const Web3 = require('web3');
const fs = require('fs');

async function signTransaction() {
  // Set up Web3 provider for connecting to a remote node
  // default for ganache is http://localhost:8545
  const providerUrl = 'http://localhost:8545';
  const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

  // Set sender and recipient addresses
  // Replace with your ganache generated addresses
  const senderAddress = '0xed1223aF4879C62046Bc09AE5E21EE22E7c168bf';
  const recipientAddress = '0x95e37E4D057c1F0EAC4265b5993626a245A6f9f9';

  // Set gas price and gas limit
  const gasPrice = web3.utils.toWei('50', 'gwei');
  const gasLimit = 2000000;

  // Create a transaction object
  const txObject = {
    from: senderAddress,
    to: recipientAddress,
    value: web3.utils.toWei('1', 'ether'),
    gasPrice: gasPrice,
    gas: gasLimit,
    nonce: await web3.eth.getTransactionCount(senderAddress)
  };

  // log txObject to console
  console.log(txObject);

  // Sign the transaction with a private key
  // Replace with your ganache generated private key
  const privateKey = '0xe61e589b5c5ff554bcc73b5d3a670d04e996c5992bd2ded0504af6d7667c02ca';
  const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

  // Save the signed transaction to a file
  const filename = 'signed_transaction.trns';
  fs.writeFileSync(filename, JSON.stringify(signedTx, null, 2));

  console.log(`Signed transaction saved to ${filename}`);
}

signTransaction();