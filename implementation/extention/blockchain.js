function addPoll(web3, public_key, private_key, data) {
    showLoader();

    return new Promise((resolve, reject) => {
        contract.methods.addNewPoll(data["rpId"], data["pqId"], data["pqLink"], data["pqTitle"], data["time"], data["value"], data["address"]).estimateGas({ from: public_key }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: contract_address,
                contractAddress: contract_address,
                gas: gas,
                value: data["value"],
                data: contract.methods.addNewPoll(data["rpId"], data["pqId"], data["pqLink"], data["pqTitle"], data["time"], data["value"], data["address"]).encodeABI()
            };
    
            const signPromise = web3.eth.accounts.signTransaction(tx, private_key);
    
            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    hideLoader();
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    hideLoader();
                    reject(err);
                });
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

function addVote(web3, public_key, private_key, data) {
    showLoader();

    return new Promise((resolve, reject) => {
        contract.methods.vote(data["pollId"], data["decision"], data["value"], data["address"]).estimateGas({ from: public_key }).then(gas => {

            const tx = {
                from: public_key,
                to: contract_address,
                contractAddress: contract_address,
                gas: gas,
                value: data["value"],
                data: contract.methods.vote(data["pollId"], data["decision"], data["value"], data["address"]).encodeABI()
            };
    
            const signPromise = web3.eth.accounts.signTransaction(tx, private_key);
    
            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    hideLoader();
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    hideLoader();
                    reject(err);
                });
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

function getWalletBalance(web3, public_key) {
    return new Promise(async (resolve, reject) => {
        try {
            let balance = await web3.eth.getBalance(public_key); 
            resolve((parseInt(balance) / (10 ** 18)) + " ETH");
        } catch(error) {
            reject(error);
        }
    });
}

function initWalletWithGas(web3, from, to, private_key) {
    return new Promise((resolve, reject) => {
        const tx = {
            from: from,
            to: to,
            gas: 1287794,
            value: '100000000000000000'
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
