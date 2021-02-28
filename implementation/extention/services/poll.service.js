/**
 * Get the open polls
 *
 * @param {any} repository - Chosen repository 
 * @return {Promise<Poll[]>} - List of polls in the repository
 */
function getPolls(repository) {
    return new Promise(async (resolve) => {
        let polls = [];
        let polls_blockchain = [];
        const issues_github = await getRequest('https://api.github.com/repos/' + repository['owner']['login'] + '/' + repository['name'] + '/issues');
        const polls_length = await manager_contract.methods.getPollsLength().call();

        for (let i = 0; i < polls_length; i++) {
            await manager_contract.methods.polls(i).call().then(poll => {
                if (poll['state'] == 2) {
                    polls_blockchain.push(poll);
                }
            });
        }

        for (let i = 0; i < issues_github.length; i++) {
            if (issues_github[i]['state']) {
                if (polls_blockchain.some((poll) => poll['issueId'] == issues_github[i]['id'])) {
                    const poll = polls_blockchain.find((issue) => issue['issueId'] == issues_github[i]['id']);

                    polls.push(new Poll(poll['id'], poll['issueId'], poll['pqId'], poll['deliverTimestamp'], poll['votingTimestamp'],
                    poll['bountyTimestamp'], poll['poll_contract_address'], issues_github[i]['title'], issues_github[i]['url']));
                }
            }
        }

        resolve(polls);
    });
}

/**
 * Update the state of a poll
 *
 * @param {number} index - Index of the poll
 * @param {number} state - New state of the poll
 * @return {Promise<any>} - Blockchain response
 */
function setPollStateInManager(index, state) {
    return new Promise((resolve, reject) => {
        manager_contract.methods.updatePoll(index, state).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: manager_contract.methods.updatePoll(index, state).encodeABI()
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
 * Submit a pull request for a poll
 *
 * @param {number} index - Index of the poll
 * @param {number} pqId - Id of the pull request
 * @return {Promise<any>} - Blockchain response
 */
function submitPullRequest(index, pqId) {
    return new Promise((resolve, reject) => {
        manager_contract.methods.submitPullRequest(index, pqId).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: manager_contract.methods.submitPullRequest(index, pqId).encodeABI()
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
 * Add a vote for the pull request
 *
 * @param {string} address - Address of the voter
 * @param {number} stake - Stake amount of the vote
 * @param {boolean} descision - Pro or Contra vote
 * @return {Promise<any>} - Blockchain response
 */
function addVote(address, stake, descision) {
    showLoader();

    return new Promise((resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, address);

        single_poll_contract.methods.vote(descision, stake, getPublicKey()).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: address,
                contractAddress: address,
                gas: gas,
                value: stake,
                data: single_poll_contract.methods.vote(descision, stake, getPublicKey()).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                resolve(sentTx);
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}