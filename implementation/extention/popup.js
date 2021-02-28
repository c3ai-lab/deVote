/* -------------------------------------------------------------------------------------------
*                                   env settings
------------------------------------------------------------------------------------------- */

var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';

var provider = 'https://sokol.poa.network';
var manager_contract_address = '0x96A728bC6bca7055Ba00be5131641058d5790F53';
let bytecode = '6080604052600060025560006003556040518060200160405280600081525060049080519060200190610033929190610262565b507328cfba097ff9bb9d904471c493b032df45b9f953600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561009557600080fd5b5060016040518060600160405280600081526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155505060006040518060800160405280600081526020016001151581526020017328cfba097ff9bb9d904471c493b032df45b9f95373ffffffffffffffffffffffffffffffffffffffff168152602001600081525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816002015550506102ff565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102a357805160ff19168380011785556102d1565b828001600101855582156102d1579182015b828111156102d05782518255916020019190600101906102b5565b5b5090506102de91906102e2565b5090565b5b808211156102fb5760008160009055506001016102e3565b5090565b610b9f8061030e6000396000f3fe6080604052600436106100dd5760003560e01c8063899a1e361161007f578063dc2f874411610059578063dc2f8744146103a7578063e8c35c721461041a578063ec9a01fe146104ff578063f962b9161461052a576100dd565b8063899a1e3614610303578063943dfef114610351578063d8dfeb451461037c576100dd565b80635df81330116100bb5780635df813301461015c57806361ebccfd146101d857806365b768fa146102325780636a7300c514610273576100dd565b8063267e6529146100e2578063553ea3e91461010d5780635ab77cb314610124575b600080fd5b3480156100ee57600080fd5b506100f7610562565b6040518082815260200191505060405180910390f35b34801561011957600080fd5b5061012261056e565b005b61015a6004803603604081101561013a57600080fd5b810190808035906020019092919080359060200190929190505050610600565b005b34801561016857600080fd5b506101956004803603602081101561017f57600080fd5b8101908080359060200190929190505050610689565b6040518085815260200184151581526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b610230600480360360608110156101ee57600080fd5b8101908080351515906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106f3565b005b34801561023e57600080fd5b506102476107de565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561027f57600080fd5b50610288610804565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102c85780820151818401526020810190506102ad565b50505050905090810190601f1680156102f55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61034f6004803603604081101561031957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108a2565b005b34801561035d57600080fd5b5061036661096f565b6040518082815260200191505060405180910390f35b34801561038857600080fd5b50610391610975565b6040518082815260200191505060405180910390f35b3480156103b357600080fd5b506103e0600480360360208110156103ca57600080fd5b810190808035906020019092919050505061097b565b604051808481526020018373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390f35b6104fd6004803603606081101561043057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561046d57600080fd5b82018360208201111561047f57600080fd5b803590602001918460018302840111640100000000831117156104a157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001909291905050506109d2565b005b34801561050b57600080fd5b50610514610a36565b6040518082815260200191505060405180910390f35b6105606004803603604081101561054057600080fd5b810190808035906020019092919080359060200190929190505050610a43565b005b60008080549050905090565b60035460025401600281905550600060038190555060405180602001604052806000815250600490805190602001906105a8929190610acc565b507328cfba097ff9bb9d904471c493b032df45b9f953600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000828154811061060d57fe5b906000526020600020906003020160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610684573d6000803e3d6000fd5b505050565b6000818154811061069657fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b60006040518060800160405280600080549050815260200185151581526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018481525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548160ff02191690831515021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201555050505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60048054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561089a5780601f1061086f5761010080835404028352916020019161089a565b820191906000526020600020905b81548152906001019060200180831161087d57829003601f168201915b505050505081565b6001604051806060016040528060018054905081526020018473ffffffffffffffffffffffffffffffffffffffff1681526020018381525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155505080600254016002819055505050565b60025481565b60035481565b6001818154811061098857fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905083565b8060038190555081600490805190602001906109ef929190610acc565b5082600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050565b6000600180549050905090565b60018281548110610a5057fe5b906000526020600020906003020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610ac7573d6000803e3d6000fd5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b0d57805160ff1916838001178555610b3b565b82800160010185558215610b3b579182015b82811115610b3a578251825591602001919060010190610b1f565b5b509050610b489190610b4c565b5090565b5b80821115610b65576000816000905550600101610b4d565b509056fea26469706673582212202ce9674392c8b3dc03d6be5b12ec4213d080a2b5a76472fbc4b281faefcc5dc764736f6c63430007010033';
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
        { key: "token", id: "cred-token", type: "input" }
    ];

    // sync the key and account data from the chrome storage
    valideSyncStorageKey(keyMatrix).then(async _ => {
        showLoader();

        if (getPublicKey()) {
            let balance = await web3.eth.getBalance(getPublicKey());
            document.getElementById("account-balance").textContent = (parseInt(balance) / (10 ** 18)) + " ETH";
        }

        const developer_token = document.getElementById("cred-token").value;
        if (developer_token) {
            user.setToken(developer_token)
        }

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
})

document.getElementById("save-btn").addEventListener("click", () => {
    showLoader();
    developer_token = document.getElementById("cred-token").value;
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

