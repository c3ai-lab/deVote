// var web3 = new Web3("https://sokol.poa.network");
// console.log(web3);

// web3.eth.getBlock(3150).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log("error");
// });
//document.getElementById("output").html=web3;
// var changeColor = document.getElementById('changeColor');

//     chrome.storage.sync.get('color', function (data) {
//         changeColor.style.backgroundColor = data.color;
//         changeColor.setAttribute('value', data.color);
//     });
//     changeColor.onclick = function(element) {
//         var myResult;
//         web3.eth.getBlock(3150).then((result) => {
//             changeColor.innerHTML=result.author;
//         }).catch((err) => {
//             console.log("error");
//         });
        
//         let color = element.target.value;
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//           chrome.tabs.executeScript(
//               tabs[0].id,
//               {code: 'document.body.innerHTML = "' + myResult + '";'});
//         });
//       };

        /* -------------------------------------------------------------------------------------------
        *                                   env settings
        ------------------------------------------------------------------------------------------- */
        var public_address = '0x28CfbA097FF9bb9D904471c493b032Df45B9f953';
        var private_key = 'f1d57d756f7a47c3e70b740acf95b38611a26b81c7a0cff7de872ab306ae35d0';
        var provider = 'https://sokol.poa.network';
        var contract_address = '0x6Cf4f810FD6558d9D2965B6444ad00cA954EaF0D';
        var contract_abi = [
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "increment",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "test2",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getCounter",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "helloWorld",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }
        ];

        /* -------------------------------------------------------------------------------------------
        *                                   init web3js
        ------------------------------------------------------------------------------------------- */

        web3 = new Web3(provider);
        contract = new this.web3.eth.Contract(contract_abi, contract_address);
        account = web3.eth.accounts.privateKeyToAccount(private_key);

        // incrementCounter();
        getNormalText();
        getCounter();

        /* -------------------------------------------------------------------------------------------
        *                                   make calls
        ------------------------------------------------------------------------------------------- */

        function getNormalText() {
            contract.methods.helloWorld().call().then(res => {
                console.log(res);
                document.getElementById("output").innerHTML=res;
            }).catch(err => console.log(err));
        }

        function getCounter() {
            contract.methods.getCounter().call().then(res => {
                console.log(res);
                document.getElementById("counter").innerHTML=res;
                
            }).catch(err => console.log(err));
        }

        /* -------------------------------------------------------------------------------------------
        *                                   make a transaction
        ------------------------------------------------------------------------------------------- */

        function incrementCounter() {
            alert("uwu");
            contract.methods.increment().estimateGas({ from: public_address }).then(gas => {

                const tx = {
                    from: public_address,
                    to: contract_address,
                    gas: gas,
                    data: contract.methods.increment().encodeABI()
                };

                const signPromise = web3.eth.accounts.signTransaction(tx, private_key);

                signPromise.then((signedTx) => {
                    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                    sentTx.on("receipt", receipt => {
                        console.log(receipt);
                        getCounter()
                       // alert("uwu");
                    });
                    sentTx.on("error", err => {
                        console.log(err);
                    });
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
        }
        document.getElementById("add").addEventListener("click", () => {
            incrementCounter();
        });



