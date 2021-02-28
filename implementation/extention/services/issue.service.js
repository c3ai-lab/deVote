/**
 * Get the issues of a repository
 *
 * @param {any} repository - Chosen repository 
 * @return {Promise<Issue[]>} - List of issues
 */
function getIssues(repository) {
    return new Promise(async (resolve) => {
        let issues = [];
        let issues_blockchain = [];
        const issues_github = await getRequest('https://api.github.com/repos/' + repository['owner']['login'] + '/' + repository['name'] + '/issues');
        const issue_length = await manager_contract.methods.getPollsLength().call();

        for (let i = 0; i < issue_length; i++) {
            await manager_contract.methods.polls(i).call().then(poll => {
                issues_blockchain.push(poll);
            });
        }


        for (let i = 0; i < issues_github.length; i++) {
            if (issues_github[i]['state']) {
                if (!issues_blockchain.some((issue) => issue['issueId'] == issues_github[i]['id'])) {
                    issues.push(new Issue(issues_github[i]['id'], 0, issues_github[i]['title'], issues_github[i]['url'], true, ""));
                } else {
                    const issue = issues_blockchain.find((issue) => issue['issueId'] == issues_github[i]['id']);

                    if (issue['state'] == 1) {
                        issues.push(new Issue(issue['issueId'], issue['id'], issues_github[i]['title'], issues_github[i]['url'], false, issue['poll_contract_address']));
                    }
                }
            }
        }

        resolve(issues);
    });
}

/**
 * Get an issue by its contract address from the manager contract
 *
 * @param {string} contract_address - issue contract address
 * @return {Promise<Issue>} - Issue with the searched contract address
 */
function getIssueIndexByContract(contract_address) {
    return new Promise(async (resolve) => {
        const issue_length = await manager_contract.methods.getPollsLength().call();

        for (let i = 0; i < issue_length; i++) {
            await manager_contract.methods.polls(i).call().then(poll => {
                if(poll['poll_contract_address'] == contract_address) {
                    resolve(poll['id']);
                }
            });
        }

        resolve(0);
    });
}

/**
 * Creates a new issue contract
 *
 * @return {Promise<any>} - Blockchain response
 */
function createIssueContract() {
    return new Promise(async (resolve, reject) => {
        let deploy_contract = new web3.eth.Contract(JSON.parse(JSON.stringify(poll_contract_abi)));

        let contractTx = deploy_contract.deploy({
            data: bytecode
        });

        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                from: getPublicKey(),
                gas: web3.utils.toHex(12475588),
                gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
                data: await contractTx.encodeABI()
            },
            getPrivateKey()
        );

        const createReceipt = await web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        );

        console.log("Poll contract deployed: ", "Contract address " + createReceipt.contractAddress)
        resolve(createReceipt.contractAddress);
    });
}

/**
 * Save an issue in the poll manager
 *
 * @param {string} address - Contract address
 * @param {number} issue - Created issue
 * @param {boolean} repository - Chosen GitHub issue 
 * @param {boolean} bountyTime - How long does the issue wait before the crowdfunder get their stake back?
 * @return {Promise<any>} - Blockchain response
 */
function appendIssueContract(address, issue, repository, bountyTime) {
    return new Promise((resolve, reject) => {
        manager_contract.methods.addPoll(repository['id'], issue.getId(), 0, address, 0, 0, bountyTime).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: manager_contract.methods.addPoll(1, issue.getId(), 0, address, 0, 0, bountyTime).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then((signedTx) => {
                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                    console.log("Poll registered: ", "Registered Poll " + receipt.contractAddress + " under the contract " + manager_contract_address);
                    resolve(receipt);
                });
                sentTx.on("error", err => {
                    console.log("Poll could not be registered: ", receipt.contractAddress + " could not be registered under " + manager_contract_address);
                    reject(err);
                });
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

/**
 * Crowdfund the bounty for an issue
 *
 * @param {Issue} issue - Crowdfunded issue
 * @param {number} stake - Staking amount
 * @return {Promise<any>} - Blockchain response
 */
function stakeOnBounty(issue, stake) {
    return new Promise((resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, issue.getContract());

        single_poll_contract.methods.addBounty(getPublicKey(), stake).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: issue.getContract(),
                contractAddress: issue.getContract(),
                gas: gas,
                value: stake,
                data: single_poll_contract.methods.addBounty(getPublicKey(), stake).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                resolve(sentTx);

            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

/**
 * Claim an issue as a developer
 *
 * @param {Issue} issue - Claimed issue
 * @param {string} username - Developer that claimed the issue
 * @return {Promise<any>} - Blockchain response
 */
function claimIssue(issue, username, stake) {
    return new Promise((resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, issue.getContract());

        single_poll_contract.methods.claimIssue(getPublicKey(), username, stake).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: issue.getContract(),
                contractAddress: issue.getContract(),
                gas: gas,
                value: stake,
                data: single_poll_contract.methods.claimIssue(getPublicKey(), username, stake).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());


            signPromise.then(async (signedTx) => {
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                resolve(sentTx);
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

/**
 * Inits the timers (developer and voting time) after the issue was claimed
 *
 * @param {string} developerTime - How long does the developer have to solve the issue?
 * @param {string} votingTime - How long does the community have to be able to vote?
 * @return {Promise<any>} - Blockchain response
 */
function initPollTimers(index, developerTime, votingTime) {
    return new Promise((resolve, reject) => {

        manager_contract.methods.initPollPhases(index, developerTime, votingTime).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: manager_contract.methods.initPollPhases(index, developerTime, votingTime).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                resolve(sentTx);
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}




/**
 * Get the bounty of an issue
 *
 * @param {Issue} issue - Issue with the bounty
 * @return {Promise<number>} - Bounty amount
 */
function getBounty(issue) {
    return new Promise(async (resolve) => {
        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, issue.getContract());
        const bounty = await single_poll_contract.methods.bounty().call();
        resolve(bounty / (10 ** 18));
    });
}