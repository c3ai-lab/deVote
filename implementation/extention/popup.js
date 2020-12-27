/* -------------------------------------------------------------------------------------------
*                                   env settings
------------------------------------------------------------------------------------------- */
var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';
var provider = 'https://sokol.poa.network';
var contract_address = '0xCa3a8f28f2190E297Ac50906310315aDD21E6303';
var github_token = 'd2a43e5829945acdb73a8bcb404790f1dc9d9953';
var username = "SerQuicky";


//                                   init web3js
//-------------------------------------------------------------------------------------------

web3 = new Web3(provider);
contract = new this.web3.eth.Contract(contract_abi, contract_address);
account = web3.eth.accounts.privateKeyToAccount(private_key);


//                                  init layout settings
//-------------------------------------------------------------------------------------------

window.addEventListener("load", function () {
    initLayout();
});

function initLayout() {
    let keyMatrix = [
        { key: "pbk", id: "public-key", type: "span" },
        { key: "prk", id: "private-key", type: "span" },
        { key: "username", id: "cred-username", type: "input" },
        { key: "token", id: "cred-token", type: "input" }
    ];

    // sync the key and account data from the chrome storage
    valideSyncStorageKey(keyMatrix).then(async _ => {
        showLoader();

        username = document.getElementById("cred-username").value;
        let balance = await web3.eth.getBalance(getPublicKey());
        document.getElementById("account-balance").textContent = (parseInt(balance) / (10 ** 18)) + " ETH";
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
document.getElementById("cred-btn").addEventListener("click", function () { gotoCard(5) });
document.getElementById("gotoWalletBtn").addEventListener("click", function () { initWalletView() });
document.getElementById("wallet-btn").addEventListener("click", function () { initWalletView() });


document.getElementById("gotoRepoBtn").addEventListener("click", async function () {
    showLoader();

    gotoCard(2);
    let repositories = await initRepositoriesAndContracts();
    repositories.forEach(repository => {
        UIapppendRepo(repository);
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
        UIaddPoll(response.contracts[i]["time"], response.contracts[i]["pqTitle"], response.contracts[i]["pqLink"], i, repository);
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
    chrome.storage.sync.set({ pbk: acc['address'] });
    chrome.storage.sync.set({ prk: acc['privateKey'] });
    await initWalletWithGas(web3, public_address, acc['address'], private_key);
    document.getElementById("account-balance").textContent = await getWalletBalance(web3, getPublicKey());

    hideLoader();
}

document.getElementById("btn-gen-keys").addEventListener("click", () => {
    genKeys();
})

document.getElementById("save-btn").addEventListener("click", () => {
    chrome.storage.sync.set({ username: document.getElementById("cred-username").value });
    chrome.storage.sync.set({ token: document.getElementById("cred-token").value });
    initLayout();
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

function UIaddPoll(time, name, url, index, repository) {

    // poll element layout
    var pollElement = generateDiv("poll-element", "poll-element-" + index);

    // poll date view
    let pollDate = generateDiv("poll-date", null);
    pollDate.appendChild(generateSpan(formateTime(time)));

    // poll name view
    let pollName = generateDiv("poll-name", null);
    pollName.appendChild(generateSpan(formateName(name)));

    // poll button listings
    let pollButtons = generateDiv("poll-buttons", "poll-element-buttons-" + index);

    // accept poll button
    var confirmBtn = generateButton("accept-button", null, "./assets/checkmark.png");
    confirmBtn.addEventListener("click", function () {
        UIupdateForVote("poll-element-" + index, "poll-element-buttons-" + index, true, repository);
    });

    // decline poll button
    var denyBtn = generateButton("decline-button", null, "./assets/cross.png");
    denyBtn.addEventListener("click", function () {
        UIupdateForVote("poll-element-" + index, "poll-element-buttons-" + index, false, repository);
    });

    // open poll link (github pull request page)
    var linkBtn = generateButton("link-button", null, "./assets/link.png");
    linkBtn.addEventListener("click", function () {
        window.open("https://github.com/" + url.split("/")[4] + "/" + url.split("/")[5] + "/" + url.split("/")[6] + "/" + url.split("/")[7], "_blank");
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

function UIupdateForVote(element_id, buttons_id, decision, repository) {
    document.getElementById(buttons_id).remove();
    let element = document.getElementById(element_id);

    let votingElement = generateDiv("poll-voting", null);
    let votingInput = generateInput(null, element_id + "-intput", "number");

    let sendButton = generateButton("link-button", null, "./assets/send.png");
    sendButton.addEventListener("click", function () {
        addVote(web3, getPublicKey(), getPrivateKey(), { "pollId": repository['pollId'], "decision": decision, "value": votingInput.value, "address": getPublicKey() }).then(response => {
            goToPollsEvent(repository, 0);
        });
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

//           generate dynamic number for possible pollable and mergeable polss
//-------------------------------------------------------------------------------------------

function UIsetPollableAndMergeableNumber(pollables, mergeables, repository) {
    let showPollBtn = document.getElementById("showPollsBtn");
    showPollBtn.addEventListener("click", function () {
        gotoCard(3);
        UIappendPollable(pollables, repository);
    });

    let showMergeBtn = document.getElementById("showMergeBtn");
    showMergeBtn.addEventListener("click", function () {
        gotoCard(7);
        UIappendMergeables(mergeables, repository);
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
            addPoll(web3, getPublicKey(), getPrivateKey(), { "rpId": repository.id, "pqId": pollable_pq['id'], "pqLink": pollable_pq['url'], "pqTitle": pollable_pq['title'], "value": 500000, "time": generatePollEnd(20), "address": getPublicKey() }).then(response => {
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
        let proWeight = mergeable_pq["proWeight"] / (10 ** 18);
        let contraWeight = mergeable_pq["contraWeight"] / (10 ** 18);

        // Layout generation of the grid-poll-element
        var mergeableElement = generateDiv("mergeable-element", null);

        let mergeableStat = generateDiv(null, null);
        let mergeableStatSpan = generateSpan(proWeight + " ETH vs " + contraWeight + " ETH");
        mergeableStatSpan.classList.add("mergeable-stats");
        mergeableStatSpan.classList.add((proWeight > contraWeight) ? "pro-merge" : "contra-merge");
        mergeableStat.appendChild(mergeableStatSpan);

        let mergeableName = generateDiv(null, null);
        let mergeableNameSpan = generateSpan(mergeable_pq.title);
        mergeableNameSpan.classList.add("mergeable-name");
        mergeableName.appendChild(mergeableNameSpan);

        let mergeableButton = generateDiv("mergeable-button", null);
        var mergeBtn = generateDiv("link-button", null);
        mergeBtn.appendChild(generateSpan("Execute action"));
        mergeBtn.addEventListener("click", function () {
            showLoader();
            if (proWeight > contraWeight) {
                mergePullRequest(mergeable_pq["url"] + "/merge", mergeable_pq["head"]["sha"]).then(re => {
                    goToPollsEvent(repository, 0);
                });
            } else {
                rejectPullRequest(mergeable_pq["url"]).then(re => {
                    goToPollsEvent(repository, 0);
                });
            }
        });


        mergeableButton.appendChild(mergeBtn);
        mergeableElement.appendChild(mergeableStat);
        mergeableElement.appendChild(mergeableName);
        mergeableElement.appendChild(mergeableButton);

        mergeList.appendChild(mergeableElement);
    });
}



function initRepositoriesAndContracts() {
    return new Promise(async (resolve, reject) => {
        reposList.innerHTML = "";
        let _polls = [];
        let _votes = [];

        // load data from data from contract and github
        const _repositories = await getRequest('https://api.github.com/users/' + username + '/starred');
        const _polls_length = await contract.methods.getPollsLength().call();
        const _votes_length = await contract.methods.getVotesLength().call();

        // get votes to compare it.
        for (let i = 0; i < _votes_length; i++) {
            await contract.methods.votes(i).call().then(vote => {
                if (vote['delegate'] == getPublicKey()) {
                    _votes.push(vote);
                }
            })
        }

        // formate contract from contract pull
        for (let i = 0; i < _polls_length; i++) {
            await contract.methods.polls(i).call().then(poll => {
                _polls.push(poll);
            });
        }

        console.log(_polls);
        console.log(_votes);

        // combine repository and contract data
        for (let i = 0; i < _repositories.length; i++) {
            _repositories[i]['openPolls'] = [];
            _repositories[i]['closedPolls'] = [];
            _repositories[i]['votedPolls'] = [];

            for (let j = 0; j < _polls.length; j++) {

/*                 console.log(_repositories[i]['id'] + " vs " + _polls[j]["rpId"]);
                console.log(_repositories[i]['id'] == _polls[j]["rpId"])

                console.log(parseInt(_polls[j]["time"]) + " vs " + getCurrentDate());
                console.log(parseInt(_polls[j]["time"]) > getCurrentDate())

                console.log(!_votes.some(vote => vote["poll"] == _polls[j]["id"])); */

                console.log("-------------------");

                if (_repositories[i]['id'] == _polls[j]["rpId"]
                    && parseInt(_polls[j]["time"]) > getCurrentDate()
                    && !_votes.some(vote => vote["poll"] == _polls[j]["id"])) {

                    _repositories[i]['pollId'] = _polls[j]["id"];
                    _repositories[i]['openPolls'].push(_polls[j]);

                } else if (_repositories[i]['id'] == _polls[j]["rpId"] && parseInt(_polls[j]["time"]) < getCurrentDate()) {
                    _repositories[i]['closedPolls'].push(_polls[j]);

                } else if (_votes.some(vote => vote["poll"] == _polls[j]["id"])) {
                    _repositories[i]['votedPolls'].push(_polls[j]);

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
        let _mergeables = [];
        let _votes = [];
        let _pulls = await getRequest("https://api.github.com/repos/" + repository['owner']['login'] + "/" + repository.name + "/pulls");
        const _votes_length = await contract.methods.getVotesLength().call();


        // get votes for mergeables
        for (let i = 0; i < _votes_length; i++) {
            await contract.methods.votes(i).call().then(vote => {
                _votes.push(vote);
            })
        }

        console.log(_pulls);

        for (let i = 0; i < _pulls.length; i++) {
            if (!repository["openPolls"].some(poll => poll['pqId'] == _pulls[i]['id'])
                && !repository["closedPolls"].some(poll => poll['pqId'] == _pulls[i]['id'])
                && !repository["votedPolls"].some(poll => poll['pqId'] == _pulls[i]['id'])) {

                _pollables.push(_pulls[i]);
            }


            if (repository["closedPolls"].some(poll => poll['pqId'] == _pulls[i]['id'])
                && repository['owner']['login'] == username
                && _pulls[i]['state'] == "open") {

                let pollId = repository["closedPolls"].find(poll => poll['pqId'] == _pulls[i]['id'])[0];
                _pulls[i]['proWeight'] = 0;
                _pulls[i]['contraWeight'] = 0;

                for (let j = 0; j < _votes.length; j++) {
                    if (_votes[j]['poll'] == pollId) {

                        // sum up weights
                        _votes[j]["decision"] ?
                            _pulls[i]['proWeight'] += parseInt(_votes[j]["weight"])
                            : _pulls[i]['contraWeight'] += parseInt(_votes[j]["weight"]);

                    }
                }

                _mergeables.push(_pulls[i]);
            }
        }

        resolve({ contracts: repository["openPolls"], pollables: _pollables, mergeables: _mergeables });
    });
}