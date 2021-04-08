/* -------------------------------------------------------------------------------------------
*                                   env settings
------------------------------------------------------------------------------------------- */

var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';

var provider = 'https://sokol.poa.network';
var manager_contract_address = '0xa6363b2eEd4a8E712dF0c7B14e406c35647c6Ffb';
let bytecode = '6080604052600060025560006003556040518060200160405280600081525060049080519060200190610033929190610262565b507328cfba097ff9bb9d904471c493b032df45b9f953600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561009557600080fd5b5060016040518060600160405280600081526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155505060006040518060800160405280600081526020016001151581526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816002015550506102ff565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102a357805160ff19168380011785556102d1565b828001600101855582156102d1579182015b828111156102d05782518255916020019190600101906102b5565b5b5090506102de91906102e2565b5090565b5b808211156102fb5760008160009055506001016102e3565b5090565b610c218061030e6000396000f3fe6080604052600436106100e85760003560e01c80636a7300c51161008a578063dc2f874411610059578063dc2f8744146103bc578063e8c35c721461042f578063ec9a01fe14610514578063f962b9161461053f576100e8565b80636a7300c514610288578063899a1e3614610318578063943dfef114610366578063d8dfeb4514610391576100e8565b80635ab77cb3116100c65780635ab77cb3146101395780635df813301461017157806361ebccfd146101ed57806365b768fa14610247576100e8565b806325f4d625146100ed578063267e6529146100f7578063553ea3e914610122575b600080fd5b6100f5610577565b005b34801561010357600080fd5b5061010c6105e4565b6040518082815260200191505060405180910390f35b34801561012e57600080fd5b506101376105f0565b005b61016f6004803603604081101561014f57600080fd5b810190808035906020019092919080359060200190929190505050610682565b005b34801561017d57600080fd5b506101aa6004803603602081101561019457600080fd5b810190808035906020019092919050505061070b565b6040518085815260200184151581526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b6102456004803603606081101561020357600080fd5b8101908080351515906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610775565b005b34801561025357600080fd5b5061025c610860565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561029457600080fd5b5061029d610886565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102dd5780820151818401526020810190506102c2565b50505050905090810190601f16801561030a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103646004803603604081101561032e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610924565b005b34801561037257600080fd5b5061037b6109f1565b6040518082815260200191505060405180910390f35b34801561039d57600080fd5b506103a66109f7565b6040518082815260200191505060405180910390f35b3480156103c857600080fd5b506103f5600480360360208110156103df57600080fd5b81019080803590602001909291905050506109fd565b604051808481526020018373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390f35b6105126004803603606081101561044557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561048257600080fd5b82018360208201111561049457600080fd5b803590602001918460018302840111640100000000831117156104b657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190505050610a54565b005b34801561052057600080fd5b50610529610ab8565b6040518082815260200191505060405180910390f35b6105756004803603604081101561055557600080fd5b810190808035906020019092919080359060200190929190505050610ac5565b005b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6002549081150290604051600060405180830381858888f193505050501580156105e1573d6000803e3d6000fd5b50565b60008080549050905090565b600354600254016002819055506000600381905550604051806020016040528060008152506004908051906020019061062a929190610b4e565b507328cfba097ff9bb9d904471c493b032df45b9f953600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000828154811061068f57fe5b906000526020600020906003020160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610706573d6000803e3d6000fd5b505050565b6000818154811061071857fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006040518060800160405280600080549050815260200185151581526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201555050505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60048054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561091c5780601f106108f15761010080835404028352916020019161091c565b820191906000526020600020905b8154815290600101906020018083116108ff57829003601f168201915b505050505081565b6001604051806060016040528060018054905081526020018473ffffffffffffffffffffffffffffffffffffffff1681526020018381525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155505080600254016002819055505050565b60025481565b60035481565b60018181548110610a0a57fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905083565b806003819055508160049080519060200190610a71929190610b4e565b5082600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050565b6000600180549050905090565b60018281548110610ad257fe5b906000526020600020906003020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610b49573d6000803e3d6000fd5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b8f57805160ff1916838001178555610bbd565b82800160010185558215610bbd579182015b82811115610bbc578251825591602001919060010190610ba1565b5b509050610bca9190610bce565b5090565b5b80821115610be7576000816000905550600101610bcf565b509056fea26469706673582212200d2f093e2e6583acbfd9adbfc615507d4130b7a8051b6f3ad4fb74c66c64912464736f6c63430007010033';
var user;

//                                   Timer settings (offsets)
//-------------------------------------------------------------------------------------------
var developer_collateral = 50000000;
var bounty_minutes = 3;
var developer_minutes = 10;
var voting_minutes = 15;

//                                   init web3js
//-------------------------------------------------------------------------------------------

web3 = new Web3(provider);
manager_contract = new this.web3.eth.Contract(manager_contract_abi, manager_contract_address);
account = web3.eth.accounts.privateKeyToAccount(private_key);


//                                  init layout settings
//-------------------------------------------------------------------------------------------

window.addEventListener("load", function () {
    openNewView(document.getElementById("loginCard"));
});

function initLayout() {
    let keyMatrix = [
        { key: "pbk", id: "public-key", type: "span" },
        { key: "prk", id: "private-key", type: "span" },
        //{ key: "token", id: "cred-token", type: "input" }
    ];

    // sync the key and account data from the chrome storage
    valideSyncStorageKey(keyMatrix).then(async _ => {
        showLoader();

        if (getPublicKey()) {
            let balance = await web3.eth.getBalance(getPublicKey());
            document.getElementById("account-balance").textContent = (parseInt(balance) / (10 ** 18)) + " ETH";
        }

/*         const developer_token = document.getElementById("cred-token").value;
        if (developer_token) {
            user.setToken(developer_token)
        } */

        openNewView(document.getElementById("menuCard"));
        
        if(getPrivateKey()) {
            await initAdvancedStart();
        }

        hideLoader();

    }).catch(err => {
        openNewView(document.getElementById("loginCard"));
    });
}

// get the references of the lists and action menus
var reposList = document.getElementById("repoList");
var pollsList = document.getElementById("pollsList");
var issuesList = document.getElementById("issuesList");
var issue_actions = document.getElementById("issue-settings-actions");
var poll_actions = document.getElementById("poll-settings-actions");

// references to all the back buttons
var backBtns = document.getElementsByClassName("backBtn");

//                          layout-setting
//-------------------------------------------------------------------------------------------

// cards ^= the views of the extension pages that are displayed by DOM-Scripting
var cardArray = [
    document.getElementById("menuCard"),
    document.getElementById("pollsCard"),
    document.getElementById("repoCard"),
    document.getElementById("walletCard"),
    document.getElementById("credCard"),
    document.getElementById("loginCard"),
    document.getElementById("repoInfoCard"),
    document.getElementById("issuesCard"),
    document.getElementById("issueActionCard"),
    document.getElementById("pollActionCard"),
];

// static view buttons (the buttons that are not generted dynamically)
document.getElementById("gotoCredBtn").addEventListener("click", function () { openNewView(document.getElementById("credCard")) });
document.getElementById("gotoWalletBtn").addEventListener("click", function () { initWalletView() });

document.getElementById("gotoRepoBtn").addEventListener("click", async function () {
    showLoader();

    if(getPublicKey()) {
        let balance = await web3.eth.getBalance(getPublicKey());
        if (balance > 100000000000000000) {
            let repositories = await getRequest('https://api.github.com/users/' + user.getUsername() + '/starred');
    
            while (reposList.firstChild) {
                reposList.removeChild(reposList.lastChild);
            }
    
            if (!repositories['message']) {
                openNewView(document.getElementById("repoCard"));
                repositories.forEach(repository => {
                    UIappendRepo(repository);
                });
            } else {
                alert("Bad credentials (developer token) or no access to this data!")
            }
        } else {
            hideLoader();
            alert("Your account balance is under 0.1 ETH, please add more ETH to your balance!");
        }
    } else {
        hideLoader();
        alert("No wallet found, please generate a wallet under 'Wallet'.");
    }

    hideLoader();
});


// go back to the last (currently first page of the extension)
for (let i = 0; i < backBtns.length; i++) {
    backBtns[i].addEventListener("click", function () { openNewView(document.getElementById("menuCard")) });
}

document.getElementById("repo-settings-back-btn").addEventListener("click", function() {
    openNewView(document.getElementById("repoCard"));
});

document.getElementById("open-issues-back-btn").addEventListener("click", function() {
    openNewView(document.getElementById("repoInfoCard"));
});

document.getElementById("open-polls-back-btn").addEventListener("click", function() {
    openNewView(document.getElementById("repoInfoCard"));
});

document.getElementById("issues-actions-back-btn").addEventListener("click", function() {
    openNewView(document.getElementById("issuesCard"));
});

document.getElementById("polls-actions-back-btn").addEventListener("click", function() {
    openNewView(document.getElementById("pollsCard"));
});


// generic navigation function
function openNewView(reference) {
    cardArray.forEach(element => {
        element.style.display = "none";
    });
    reference.style.display = "block";
}


async function initWalletView() {
    showLoader();

    document.getElementById("account-balance").textContent = await getWalletBalance(web3, getPublicKey());
    openNewView(document.getElementById("walletCard"));

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
});

document.getElementById("btn-send-balance").addEventListener("click", () => {
    generateSendBalanceModal();

    document.getElementById("cancel-send-modal-btn").addEventListener("click", function () {
        document.getElementById("send-modal").remove();
    });

    document.getElementById("submit-send-modal-btn").addEventListener("click", async function () {
        showLoader();
        let amount = document.getElementById("send-modal-staking-amount").value;
        let receiver = document.getElementById("send-modal-staking-receiver").value;
        let balance = await web3.eth.getBalance(getPublicKey());
        if (amount && receiver && balance >= amount) {
            await sendBalance(web3, amount, receiver);
            document.getElementById("send-modal").remove();
        } else {
            alert("Invalid amount to send, insufficient balance or invald receiver address!")
        }
        hideLoader();
    });
})

document.getElementById("save-btn").addEventListener("click", () => {
    showLoader();
    //developer_token = document.getElementById("cred-token").value;
    chrome.storage.sync.set({ token: developer_token });
    user.setToken(developer_token);
    openNewView(document.getElementById("menuCard"));
    hideLoader();
})

//                          generate dynamic repository elements
//-------------------------------------------------------------------------------------------

function UIappendRepo(repository) {
    let repoElement = document.createElement("div");
    let repoName = generateSpan(formateName(repository.name), "");

    repoElement.classList.add("repository-element");
    repoElement.addEventListener("click", function () {
        initRepositorySettings(repository)
    });

    repoElement.appendChild(repoName);
    repoList.appendChild(repoElement);
}

