/* 1. Holle alle Polls aus dem Poll-Manager
2. Filtere nach Polls wo die Voting-Zeit < Jetzt ist
3. ForEach Poll
    1. Wurde eine PQ eingereicht?
        1. Nein
            1. Bounty wieder eröffnen
            2. Pfand des Developers in die Bounty packen
        2. Ja
            1. Alle votes auswerten
                1. Pros haben Mehrheit
                    1. Loser stakest an Developer und Pro Staker (20 / 80) verteilen
                    2. Bounty an Developer senden
                2. Contra haben „Mehrheit“
                    1. Loser stake geht (100) an die Contra Staker 
                    2. Bounty wieder eröffnen
                    3. Pfand des Developers in die Bounty */

/**
* Init the starting evaluation process for the poll process
*
* @return {Promise<any>} - When did the process end?
*/
function initAdvancedStart() {
    return new Promise(async (resolve) => {
        let polls = await filterPolls();

        for (let i = 0; i < polls.length; i++) {
            if (parseInt(polls[i]['pqId']) && (getCurrentDate() > polls[i]['votingTimestamp'])) {
                let eval = await evaluateVotes(polls[i]);
                await resolvePoll(eval['result'], eval['winnerStake'], eval['allStakes'], polls[i]);
                await setPollStateInManager(polls[i]['id'], 0);
            } else {
                if (polls[i]['state'] == 1 && (getCurrentDate() > polls[i]['bountyTimestamp'])) {
                    await resetToBountyToStart(polls[i]);
                } else if (polls[i]['state'] == 2 && (getCurrentDate() > polls[i]['deliverTimestamp'])) {
                    await resetToBountyProcess(polls[i]);
                }
            }
        }
        resolve();
    });
}

/**
* Search for polls that are finished
*
* @return {Promise<Poll[]>} - Finished polls
*/
function filterPolls() {
    return new Promise(async (resolve) => {
        let polls_blockchain = [];
        const poll_length = await manager_contract.methods.getPollsLength().call();

        for (let i = 0; i < poll_length; i++) {
            await manager_contract.methods.polls(i).call().then(poll => {
                if (poll['state'] != 0) {
                    polls_blockchain.push(poll);
                }
            });
        }

        resolve(polls_blockchain);
    });
}

/**
* Evaluates a poll (how many pro- and contra stakes)
*
* @param {string} poll - poll to evaluate
* @return {Promise<any>} - Staking statistics
*/
function evaluateVotes(poll) {
    return new Promise(async (resolve) => {
        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, poll['poll_contract_address']);
        let votes_length = await single_poll_contract.methods.getVotesLength().call();

        let proWeight = 0;
        let contraWeight = 0;

        for (let i = 0; i < votes_length; i++) {
            await single_poll_contract.methods.votes(i).call().then(vote => {
                if (vote['decision']) {
                    proWeight += parseInt(vote['weight']);
                } else {
                    contraWeight += parseInt(vote['weight']);
                }
            });
        }

        resolve({
            "result": proWeight > contraWeight,
            "allStakes": proWeight + contraWeight,
            "winnerStake": proWeight > contraWeight ? proWeight : contraWeight
        });
    });
}

/**
* Resolves a polls (sends winning stakes to the addresses)
*
* @param {boolean} result - result of the poll
* @param {string} winnerStake - summed winner stakes
* @param {string} allStakes - summed stakes (all stakes winner + losers)
* @param {string} poll - poll to resolve
* @return {Promise<any>} - Process finished
*/
function resolvePoll(result, winnerStake, allStakes, poll) {
    return new Promise(async (resolve) => {
        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, poll["poll_contract_address"]);
        let votes_length = await single_poll_contract.methods.getVotesLength().call();

        for (let i = 0; i < votes_length; i++) {
            await single_poll_contract.methods.votes(i).call().then(async vote => {
                if (vote['weight'] != 0) {
                    if (result == vote['decision']) {
                        const weight = Math.round(((parseInt(vote['weight']) / winnerStake) * allStakes));
                        await transferFunds(poll["poll_contract_address"], vote['id'], weight, vote['delegate']);
                    }
                }
            });
        }

        resolve();
    })
}

/**
* Reset the bounty process to the claiming process
*
* @param {string} poll - poll to resolve
* @return {Promise<any>} - Process finished
*/
function resetToBountyProcess(poll) {
    return new Promise(async (resolve) => {
        await resetClaimer(poll['poll_contract_address']);
        await setPollStateInManager(poll['id'], 1);
        resolve();
    });
}

/**
* Reset the bounty process to the start process
*
* @param {string} poll - poll to resolve
* @return {Promise<any>} - Process finished
*/
function resetToBountyToStart(poll) {
    return new Promise(async (resolve) => {
        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, poll["poll_contract_address"]);
        let bounties_length = await single_poll_contract.methods.getBountiesLength().call();

        for (let i = 0; i < bounties_length; i++) {
            await single_poll_contract.methods.bounties(i).call().then(async bounty => {
                if (bounty['weight'] != 0) {
                    await transferBountyStakes(poll["poll_contract_address"], bounty['id'], bounty['weight'], bounty['staker']);
                }
            });
        }

        await cancelPoll(poll['id']);

        resolve();
    });
}

/**
* Reset claimer of an issue / poll
*
* @param {string} address - Contract address
* @return {Promise<any>} - Process finished
*/
function resetClaimer(address) {
    return new Promise(async (resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, address);

        single_poll_contract.methods.resetClaim().estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: address,
                contractAddress: address,
                gas: gas,
                data: single_poll_contract.methods.resetClaim().encodeABI()
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
* Transfer funds / stakes
*
* @param {string} address - Receiver address
* @param {string} index - index of the vote
* @param {string} value - value to transfer
* @param {string} delegate - For the logging
* @return {Promise<any>} - Process finished
*/
function transferFunds(address, index, value, delegate) {
    return new Promise(async (resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, address);
        single_poll_contract.methods.transferStakes(index, value).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: address,
                contractAddress: address,
                gas: gas,
                data: single_poll_contract.methods.transferStakes(index, value).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                console.log("Stake was transfered: ", "The winnerstake of " + value + " was transfered to " + delegate);
                resolve(sentTx);
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}


/**
* Transfer funds / stakes
*
* @param {string} address - Receiver address
* @param {string} index - index of the vote
* @param {string} value - value to transfer
* @param {string} delegate - For the logging
* @return {Promise<any>} - Process finished
*/
function transferBountyStakes(address, index, value, delegate) {
    return new Promise(async (resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, address);
        single_poll_contract.methods.transferBounty(index, value).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: address,
                contractAddress: address,
                gas: gas,
                data: single_poll_contract.methods.transferBounty(index, value).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                console.log("Bountystake was transfered: ", "The bountystake of " + value + " was transfered to " + delegate);
                resolve(sentTx);
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}

/**
 * Cancel a poll, if no developer claims it
 *
 * @param {number} index - Index of the poll
 * @return {Promise<any>} - Blockchain response
 */
function cancelPoll(index) {
    return new Promise((resolve, reject) => {
        manager_contract.methods.cancelPoll(index).estimateGas({ from: getPublicKey() }).then(gas => {

            const tx = {
                from: getPublicKey(),
                to: manager_contract_address,
                contractAddress: manager_contract_address,
                gas: gas,
                data: manager_contract.methods.cancelPoll(index).encodeABI()
            };

            const signPromise = web3.eth.accounts.signTransaction(tx, getPrivateKey());

            signPromise.then(async (signedTx) => {
                const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                resolve(sentTx);
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
}