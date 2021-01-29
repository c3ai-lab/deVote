/* -------------------------------------------------------------------------------------------
*                                   env settings
------------------------------------------------------------------------------------------- */
var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';
var provider = 'https://sokol.poa.network';
var contract_address = '0xCa3a8f28f2190E297Ac50906310315aDD21E6303';
var manager_contract_address = '0xFf2cCF705A3083E302BF8fc9Edb86980AD0687dc';
let bytecode = '608060405234801561001057600080fd5b5060006040518060800160405280600081526020016001151581526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020155505061039d806101186000396000f3fe60806040526004361061003f5760003560e01c8063267e6529146100445780635ab77cb31461006f5780635df81330146100a757806361ebccfd14610123575b600080fd5b34801561005057600080fd5b5061005961017d565b6040518082815260200191505060405180910390f35b6100a56004803603604081101561008557600080fd5b810190808035906020019092919080359060200190929190505050610189565b005b3480156100b357600080fd5b506100e0600480360360208110156100ca57600080fd5b8101908080359060200190929190505050610212565b6040518085815260200184151581526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b61017b6004803603606081101561013957600080fd5b8101908080351515906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061027c565b005b60008080549050905090565b6000828154811061019657fe5b906000526020600020906003020160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561020d573d6000803e3d6000fd5b505050565b6000818154811061021f57fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006040518060800160405280600080549050815260200185151581526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020155505050505056fea2646970667358221220a2e63af99aae6a38190a0a194bce878f250938496b597e4fbcb80b800cab721b64736f6c63430007010033';
var github_token = '';
var developer_token = '';
var username = '';


//                                   init web3js
//-------------------------------------------------------------------------------------------

web3 = new Web3(provider);
contract = new this.web3.eth.Contract(contract_abi, contract_address);
manager_contract = new this.web3.eth.Contract(manager_contract_abi, manager_contract_address);

account = web3.eth.accounts.privateKeyToAccount(private_key);


//                                  init layout settings
//-------------------------------------------------------------------------------------------

window.addEventListener("load", function () {
    gotoCard(6);
});

function initLayout() {
    let keyMatrix = [
        { key: "pbk", id: "public-key", type: "span" },
        { key: "prk", id: "private-key", type: "span" },
        { key: "token", id: "cred-token", type: "input" }
    ];

    // sync the key and account data from the chrome storage
    valideSyncStorageKey(keyMatrix).then(async _ => {
        showLoader();

        if(getPublicKey()) {
            let balance = await web3.eth.getBalance(getPublicKey());
            document.getElementById("account-balance").textContent = (parseInt(balance) / (10 ** 18)) + " ETH";
        }

        gotoCard(0);
        hideLoader();

    }).catch(err => {
        gotoCard(6);
    });
}

// get the references of the lists
var reposList = document.getElementById("repoList");
var pollsList = document.getElementById("pollsList");
var pullList = document.getElementById("pullList");
var mergeList = document.getElementById("mergeList");

// references to all the back buttons
var backBtns = document.getElementsByClassName("backBtn");


//                          layout-setting
//-------------------------------------------------------------------------------------------

// cards ^= the views of the extension pages that are displayed by DOM-Scripting
var cardArray = [
    document.getElementById("menuCard"),
    document.getElementById("pollsCard"),
    document.getElementById("repoCard"),
    document.getElementById("pullCard"),
    document.getElementById("walletCard"),
    document.getElementById("credCard"),
    document.getElementById("loginCard"),
    document.getElementById("mergeCard")
];

// static view buttons (the buttons that are not generted dynamically)
document.getElementById("gotoCredBtn").addEventListener("click", function () { gotoCard(5) });
//document.getElementById("cred-btn").addEventListener("click", function () { gotoCard(5) });
document.getElementById("gotoWalletBtn").addEventListener("click", function () { initWalletView() });
//document.getElementById("wallet-btn").addEventListener("click", function () { initWalletView() });


document.getElementById("gotoRepoBtn").addEventListener("click", async function () {
    showLoader();

    gotoCard(2);
    let repositories = await initRepositoriesAndContracts();
    repositories.forEach(repository => {
        UIapppendRepo(repository);
    });

    // console.log(acc['privateKey']);
    // console.log(acc['address']);
    console.log(document.getElementById("public-key").textContent);
    console.log(document.getElementById("private-key").textContent);

    console.log(developer_token);

    var tempBalance = await getWalletBalance(web3, getPublicKey());
    console.log(tempBalance);
    var tempPk = document.getElementById("public-key").textContent;
    var tempSk = document.getElementById("private-key").textContent;
    
    await chrome.storage.sync.get("token", function (data) {
        developer_token=data.token;
        console.log(developer_token);
        console.log(developer_token.length);
         if(tempBalance<0.1 || tempPk.length <=0 || tempSk.length <=0 || developer_token.length <=0){//TODO correct length
            alert("Fehler: Fehlende Daten oder nicht genug ETH");
            gotoCard(0);
         }
     });


    hideLoader();
});


// go back to the last (currently first page of the extension)
for (let i = 0; i < backBtns.length; i++) {
    backBtns[i].addEventListener("click", function () { gotoCard(0) });
}

// generic navigation function
function gotoCard(index) {
    cardArray.forEach(element => {
        element.style.display = "none";
    });
    cardArray[index].style.display = "block";
}


async function initWalletView() {
    showLoader();

    document.getElementById("account-balance").textContent = await getWalletBalance(web3, getPublicKey());
    gotoCard(4);

    hideLoader();
}

//                          Events (generate, get, build up, ... something)
//-------------------------------------------------------------------------------------------

// load or reloard the polls list (the poll elements)
async function goToPollsEvent(repository, index) {
    showLoader();

    document.getElementById("pollsHeader").innerHTML = "Polls of " + formateName(repository.name);
    gotoCard(index);

    let response = await initContractPollsAndPollables(repository);
    UIsetPollableAndMergeableNumber(response.pollables, response.mergeables, repository);

    for (let i = 0; i < response.contracts.length; i++) {
        UIaddPoll(response.contracts[i]["timestamp"], response.contracts[i]["pqTitle"], response.contracts[i]["pqLink"], i, repository, response.contracts[i]);
    }

    hideLoader();
}


//                          wallet management
//-------------------------------------------------------------------------------------------


async function genKeys() {
    showLoader();

    let acc = web3.eth.accounts.create(web3.utils.randomHex(32));

    // save adress and private key in the persistant storage
    document.getElementById("public-key").textContent = acc['address'];
    document.getElementById("private-key").textContent = acc['privateKey'];
    await chrome.storage.sync.set({ "pbk": acc['address'] });
    await chrome.storage.sync.set({ "prk": acc['privateKey'] });
    await initWalletWithGas(web3, public_address, acc['address'], private_key);
    document.getElementById("account-balance").textContent = await getWalletBalance(web3, getPublicKey());

    hideLoader();
}

document.getElementById("btn-gen-keys").addEventListener("click", () => {
    genKeys();
})

document.getElementById("save-btn").addEventListener("click", () => {
    showLoader();
    developer_token = document.getElementById("cred-token").value;
    chrome.storage.sync.set({ token: developer_token });
    gotoCard(0);
    hideLoader();
})

//                          generate dynamic repository elements
//-------------------------------------------------------------------------------------------

function UIapppendRepo(repository) {
    let repoElement = document.createElement("div");
    let repoName = generateSpan(formateName(repository.name));
    let repoPolls = document.createElement("div");

    repoPolls.textContent = repository.openPolls.length;

    repoElement.classList.add("repository-element");
    repoElement.addEventListener("click", function () {
        goToPollsEvent(repository, 1);
    });

    repoElement.appendChild(repoName);
    repoElement.appendChild(repoPolls);
    repoList.appendChild(repoElement);
}




//                          generate dynamic poll elements
//-------------------------------------------------------------------------------------------

function UIaddPoll(time, name, url, index, repository, contract) {

    // poll element layout
    var pollElement = generateDiv("poll-element", "poll-element-" + index);

    // poll date view
    let pollDate = generateDiv("poll-date", null);
    var day = time.substring(6,8);
    var month = time.substring(4,6);
    var year = time.substring(0,4);
    var hours = time.substring(time.length-4,time.length-2);
    var minutes = time.substring(time.length-2,time.length);
    console.log(time);
    console.log(hours);
    console.log(year)
    pollDate.appendChild(generateSpan(day+"."+month+"."+year+" "+hours+":"+minutes));

    // poll name view
    let pollName = generateDiv("poll-name", null);
    pollName.appendChild(generateSpan(formateName(name)));

    // poll button listings
    let pollButtons = generateDiv("poll-buttons", "poll-element-buttons-" + index);

    // accept poll button
    var confirmBtn = generateButton("accept-button", null, "./assets/checkmark.png");
    confirmBtn.addEventListener("click", function () {
        UIupdateForVote("poll-element-" + index, "poll-element-buttons-" + index, true, repository, contract);
    });

    // decline poll button
    var denyBtn = generateButton("decline-button", null, "./assets/cross.png");
    denyBtn.addEventListener("click", function () {
        UIupdateForVote("poll-element-" + index, "poll-element-buttons-" + index, false, repository, contract);
    });

    // open poll link (github pull request page)
    var linkBtn = generateButton("link-button", null, "./assets/link.png");
    linkBtn.addEventListener("click", function () {
        window.open("https://github.com/" + url.split("/")[4] + "/" + url.split("/")[5] + "/pull/" + url.split("/")[7], "_blank");
    });

    // append buttons
    pollButtons.appendChild(confirmBtn);
    pollButtons.appendChild(denyBtn);
    pollButtons.appendChild(linkBtn);

    // append element parts
    pollElement.appendChild(pollDate);
    pollElement.appendChild(pollName);
    pollElement.appendChild(pollButtons);

    // append complete poll element
    pollsList.appendChild(pollElement);
}

//                          generate dynamic poll-vote elements (gas input view)
//-------------------------------------------------------------------------------------------

function UIupdateForVote(element_id, buttons_id, decision, repository, contract) {
    document.getElementById(buttons_id).remove();
    let element = document.getElementById(element_id);

    let votingElement = generateDiv("poll-voting", null);
    let votingInput = generateInput(null, element_id + "-input", "number");
    

    let sendButton = generateButton("link-button", null, "./assets/send.png");
    sendButton.addEventListener("click", function () {
        votingInputVal=Number(votingInput.value * 0.001);
        //if(Number(votingInput.value) >= 50000000000000 && Number(votingInput.value) < 5000000000000000) {
        if(Number(votingInput.value) >= 1 && Number(votingInput.value) <= 10) {
            addVote(contract['poll_contract_address'], Number(votingInputVal)*1000000000000000000, decision).then(response => {//TODO note for *100 multiplier?
                hideLoader();
                goToPollsEvent(repository, 0);
            });
        } else {
            alert("The minimum stake-amount should be over 0.001 and the maximum under 0.01 ETH");
        }
    });

    var cancelButton = generateButton("link-button", null, "./assets/back.png");
    cancelButton.addEventListener("click", function () {
        goToPollsEvent(repository, 1);
    });

    votingElement.appendChild(votingInput);
    votingElement.appendChild(sendButton);
    votingElement.appendChild(cancelButton);
    element.appendChild(votingElement);
}

//           generate dynamic number for possible pollable and mergeable polls
//-------------------------------------------------------------------------------------------

function UIsetPollableAndMergeableNumber(pollables, mergeables, repository) {
    let showPollBtn = document.getElementById("showPollsBtn");
    showPollBtn.addEventListener("click", function () {
        gotoCard(3);
        UIappendPollable(pollables, repository);
    });

    let showMergeBtn = document.getElementById("showMergeBtn");
    showMergeBtn.addEventListener("click", async function () {
        gotoCard(7);
        const updatedMergeables = await calcVoteWeights(mergeables);
        UIappendMergeables(updatedMergeables, repository);
    });

    let pollNumber = document.createElement("div");
    pollNumber.textContent = pollables.length;
    showPollBtn.replaceChild(pollNumber, showPollBtn.childNodes[3]);

    let mergeNumber = document.createElement("div");
    mergeNumber.textContent = mergeables.length;
    showMergeBtn.replaceChild(mergeNumber, showMergeBtn.childNodes[3]);
}

//                   generate dynamic poll-vote elements (gas input view)
//-------------------------------------------------------------------------------------------

function UIappendPollable(pollables, repository) {
    pullList.textContent = '';
    document.getElementById("pollableHeader").textContent = "Pollable pull-requests of " + formateName(repository.name);

    pollables.forEach(pollable_pq => {
        var pollableElement = generateDiv("pollable-element", null);

        let pollableName = generateDiv(null, null);
        pollableName.appendChild(generateSpan(pollable_pq.title));

        let pollableButton = generateDiv("pollable-button", null);

        // add the action button to the poll element layout container
        var pollBtn = generateDiv("link-button", null);
        pollBtn.appendChild(generateSpan("Create poll"));
        pollBtn.addEventListener("click", function () {
            addPoll({"rpId": repository.id, "pqId": pollable_pq['id'], "value": 0, "time": generatePollEnd(3) }).then(response => {
                goToPollsEvent(repository, 0);
            }).catch(err => {
                console.log("blockchain_error", err);
            });
        });

        pollableButton.appendChild(pollBtn);
        pollableElement.appendChild(pollableName);
        pollableElement.appendChild(pollableButton);

        pullList.appendChild(pollableElement);
    });
}

function UIappendMergeables(mergeables, repository) {

    mergeList.textContent = '';
    document.getElementById("mergeableHeader").textContent = "Mergeable pull-requests of " + formateName(repository.name);

    mergeables.forEach(mergeable_pq => {
        let proWeight = mergeable_pq["proWeight"] / (10 ** 18);//TODO shorten?
        let contraWeight = mergeable_pq["contraWeight"] / (10 ** 18);

        // Layout generation of the grid-poll-element
        var mergeableElement = generateDiv("mergeable-element", null);
        let mergeableTextWrap = generateDiv(null, null);

        let mergeableStat = generateDiv(null, null);
        let mergeableStatSpanPro = generateSpan(proWeight + " ETH PRO ");
        let mergeableStatSpanCon = generateSpan(contraWeight + " ETH CON");
        mergeableStatSpanPro.classList.add("mergeable-stats");
        mergeableStatSpanCon.classList.add("mergeable-stats");

        mergeableStatSpanPro.classList.add((proWeight > contraWeight) ? "pro-merge" : "contra-merge");
        mergeableStatSpanCon.classList.add((proWeight > contraWeight) ? "pro-merge" : "contra-merge");

        mergeableStat.appendChild(mergeableStatSpanPro);
        mergeableStat.appendChild(document.createElement("BR"));
        mergeableStat.appendChild(mergeableStatSpanCon);

        let mergeableName = generateDiv(null, null);
        let mergeableNameSpan = generateSpan(mergeable_pq.pqTitle);
        mergeableNameSpan.classList.add("mergeable-name");
        mergeableName.appendChild(mergeableNameSpan);

        let mergeableButton = generateDiv("mergeable-button", null);
        var mergeBtn = generateDiv("link-button", null);
        mergeBtn.appendChild(generateSpan("Execute action"));
        mergeBtn.addEventListener("click", async function () {
            showLoader();
            await resolveContractStakes(mergeable_pq, proWeight > contraWeight, proWeight > contraWeight ? proWeight.toFixed(5) : contraWeight.toFixed(5),  (proWeight + contraWeight).toFixed(5));
            closePoll(mergeable_pq["id"]).then(async _ => {
                finishPullRequest(proWeight, contraWeight, mergeable_pq, repository);
            }).catch(_ => {
                goToPollsEvent(repository, 0);
            });
        });


        mergeableButton.appendChild(mergeBtn);
        mergeableTextWrap.appendChild(mergeableStat);
        mergeableTextWrap.appendChild(mergeableName);
        mergeableElement.appendChild(mergeableTextWrap);
        mergeableElement.appendChild(mergeableButton);

        mergeList.appendChild(mergeableElement);
    });
}

function finishPullRequest(proWeight, contraWeight, mergeable_pq, repository) {
    if (proWeight > contraWeight) {
        mergePullRequest(mergeable_pq["pqLink"] + "/merge", mergeable_pq["sha"]).then(re => {
            goToPollsEvent(repository, 0);
        });
    } else {
        rejectPullRequest(mergeable_pq["pqLink"]).then(re => {
            goToPollsEvent(repository, 0);
        });
    }
}


function initRepositoriesAndContracts() {
    return new Promise(async (resolve, reject) => {
        reposList.innerHTML = "";
        let _polls = [];

        // load data from data from contract and github
        const _repositories = await getRequest('https://api.github.com/users/' + username + '/starred');
        const _polls_length = await manager_contract.methods.getPollsLength().call();

        // formate contract from contract pull
        for (let i = 0; i < _polls_length; i++) {
            await manager_contract.methods.polls(i).call().then(poll => {
                _polls.push(poll);
            });
        }

        // combine repository and contract data
        for (let i = 0; i < _repositories.length; i++) {
            _repositories[i]['openPolls'] = [];
            _repositories[i]['closedPolls'] = [];
            _repositories[i]['mergeablePolls'] = [];
            _repositories[i]['votedPolls'] = [];

            for (let j = 0; j < _polls.length; j++) {

                if (_repositories[i]['id'] == _polls[j]["rpId"] && _polls[j]["open"] && parseInt(_polls[j]["timestamp"]) > getCurrentDate()) {
                    _repositories[i]['pollId'] = _polls[j]["id"];
                    _repositories[i]['openPolls'].push(_polls[j]);

                } else if (_repositories[i]['id'] == _polls[j]["rpId"] && _polls[j]["open"] && parseInt(_polls[j]["timestamp"]) < getCurrentDate()) {
                    _repositories[i]['pollId'] = _polls[j]["id"];
                    _repositories[i]['mergeablePolls'].push(_polls[j]);
                    _repositories[i]['mergeablePolls'][_repositories[i]['mergeablePolls'].length - 1]['proWeight'] = 0;
                    _repositories[i]['mergeablePolls'][_repositories[i]['mergeablePolls'].length - 1]['contraWeight'] = 0;

                } else if (_repositories[i]['id'] == _polls[j]["rpId"] && !_polls[j]["open"]) {
                    _repositories[i]['pollId'] = _polls[j]["id"];
                    _repositories[i]['closedPolls'].push(_polls[j]);
                }
            }
        }

        resolve(_repositories);
    });
}

function initContractPollsAndPollables(repository) {
    return new Promise(async (resolve, reject) => {

        pollsList.innerHTML = "";
        pullList.innerHTML = "";
        mergeList.innerHTML = "";

        let _pollables = [];
        let _pulls = await getRequest("https://api.github.com/repos/" + repository['owner']['login'] + "/" + repository.name + "/pulls");

        for (let i = 0; i < _pulls.length; i++) {
            if (!repository["openPolls"].some(poll => poll['pqId'] == _pulls[i]['id'])
                && !repository["closedPolls"].some(poll => poll['pqId'] == _pulls[i]['id'])
                && !repository["mergeablePolls"].some(poll => poll['pqId'] == _pulls[i]['id'])) {

                _pollables.push(_pulls[i]);
            }

            // TODO: Refactor this
            if(repository["openPolls"].some(poll => poll['pqId'] == _pulls[i]['id'])) {
                const index = repository["openPolls"].findIndex(poll => poll['pqId'] == _pulls[i]['id']);
                repository["openPolls"][index]['pqTitle'] = _pulls[i]["title"];
                repository["openPolls"][index]['pqLink'] = _pulls[i]["url"]; 

            } else if (repository["mergeablePolls"].some(poll => poll['pqId'] == _pulls[i]['id'])) {
                const index = repository["mergeablePolls"].findIndex(poll => poll['pqId'] == _pulls[i]['id']);
                repository["mergeablePolls"][index]['pqTitle'] = _pulls[i]["title"];
                repository["mergeablePolls"][index]['pqLink'] = _pulls[i]["url"]; 
                repository["mergeablePolls"][index]['sha'] = _pulls[i]["head"]['sha']; 
            }

        }

        resolve({ contracts: repository["openPolls"], pollables: _pollables, mergeables: repository["mergeablePolls"] });
    });
}

function calcVoteWeights(mergeables) { 
    return new Promise(async (resolve, reject) => {
        for(let i = 0; i < mergeables.length; i++) {
            mergeables[i]['proVotes'] = [];
            mergeables[i]['conVotes'] = [];

            let single_poll_contract = new web3.eth.Contract(poll_contract_abi, mergeables[i]["poll_contract_address"]);
            let votes_length = await single_poll_contract.methods.getVotesLength().call();

            for(let a = 0; a < votes_length; a++) {
                await single_poll_contract.methods.votes(a).call().then(vote => {
                    if(vote['decision']) {
                        mergeables[i]['proWeight'] +=  parseInt(vote['weight']);
                        mergeables[i]['proVotes'].push(vote)
                    } else {
                        mergeables[i]['contraWeight'] += parseInt(vote['weight']);
                        mergeables[i]['conVotes'].push(vote);
                    }
                });
            }
        }
        resolve(mergeables);
    });
}

function resolveContractStakes(mergeable_pq, result, partStake, completeStake) {
    console.log("Start stake transfer: ", "Trying to resolve the stakes for the poll contract " + mergeable_pq["poll_contract_address"]);

    return new Promise(async (resolve, reject) => {

        let single_poll_contract = new web3.eth.Contract(poll_contract_abi, mergeable_pq["poll_contract_address"]);
        let votes_length = await single_poll_contract.methods.getVotesLength().call();

        for(let a = 0; a < votes_length; a++) {
            await single_poll_contract.methods.votes(a).call().then(async vote => {
                if(a != 0) {

                    if(result == vote['decision']) {
                        const weight = Math.round(((parseInt(vote['weight']) / partStake) * completeStake));
                        await resolvePoll(mergeable_pq["poll_contract_address"], vote['id'], weight, vote['delegate']);
                    }
                }
            });
        }

        resolve();
    });
}