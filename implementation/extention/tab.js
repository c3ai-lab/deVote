 const client_id = "Iv1.48dd44f0ab0fee0b";
 const client_secret = "6d2f0159ff909a8cc68c622dd1b92624f4922599";

//const client_id = "Iv1.6b86b6e53dd67414";
//const client_secret = "8c4eabc09c8b2bc504b50b795c7f8308453650c6";

window.onload = function () {

    // document.querySelector('#github-btn').addEventListener('click', function () {
    //     chrome.identity.launchWebAuthFlow({
    //         'url': 'https://github.com/login/oauth/authorize?client_id=' + client_id + "&scope=repo", 'interactive': true
    //     },
    //         function (redirect_url) {
    //             let urlParams = new URL(redirect_url.toString());
    //             let code = urlParams.searchParams.get("code");

    //             let request = new XMLHttpRequest();
    //             request.onload = init;
    //             request.open('post', 'https://github.com/login/oauth/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code);
    //             request.send();
    //         });
    // });

};

function init() {
    showLoader();
    let token = this.responseText.split("=")[1].split("&")[0];

    fetch("https://api.github.com/user", {
        method: 'GET',
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + token,
        }),
    })
        .then(response => response.json())
        .then(res => {
            username = res['login'];
            user = new User(res['login'], '', false);

            const account = web3.eth.accounts.privateKeyToAccount('0x' + private_key);
            web3.eth.accounts.wallet.add(account);
            web3.eth.defaultAccount = account.address;

            setTimeout(() => {
                initLayout();
            }, 750);
        });
}
