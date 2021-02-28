/**
 * Get the balance of a wallet
 *
 * @param {Web3} web3 - Web3js object reference
 * @param {string} public_key - Public address of the wallet to check
 * @return {Promise<string>} - Balance of the wallet
 */
function getWalletBalance(web3, public_key) {
    return new Promise(async (resolve, reject) => {
        try {
            if(public_key) {
                let balance = await web3.eth.getBalance(public_key);
                resolve((parseInt(balance) / (10 ** 18)) + " ETH");
            }
            resolve("0 ETH");
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Faucet function to top up the accounts
 *
 * @param {Web3} web3 - Web3js object reference
 * @param {string} from - sender address
 * @param {string} to - receiver address
 * @param {string} private_key - private key of the faucet account
 * @return {Promise<any>} - Blockchain response
 */
function initWalletWithGas(web3, from, to, private_key) {
    return new Promise((resolve, reject) => {
        const tx = {
            from: from,
            to: to,
            gas: 1287794,
            value: '3000000000000000000'
        };

        const signPromise = web3.eth.accounts.signTransaction(tx, private_key);

        signPromise.then((signedTx) => {
            const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            sentTx.on("receipt", receipt => {
                resolve(receipt);
            });
            sentTx.on("error", err => {
                reject(err);
            });
        }).catch(error => reject(error));
    });
}