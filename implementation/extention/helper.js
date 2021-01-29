function formateTime(str) {
    return str.substr(6, 2) + "." + str.substr(4, 2) + "." + str.substr(0, 4) + " " + str.substr(8, 2) + ":" + str.substr(10, 2);
}

function generatePollEnd(minutes) {
    let initial_date = new Date;
    let today = new Date(initial_date.getTime() + (minutes*60*1000));


    var tempDay = ""+appendZeroForDate(today.getDate());
    var tempMonth= ""+today.getMonth() + 1;
    if(tempDay.length<=1){
        tempDay = "0"+tempDay;
    }
    if(tempMonth.length<=1){
        tempMonth = "0"+tempMonth;
    }
    return today.getFullYear() + "" 
        + tempMonth + "" 
        + tempDay + "" 
        + appendZeroForDate(today.getHours()) + "" 
        + appendZeroForDate(today.getMinutes());
}

function formateName(str) {
    return str.length > 15 ? str.substr(0, 15) + "..." : str;
}

function getCurrentDate() {
    let today = new Date();
    var tempDay = ""+appendZeroForDate(today.getDate());
    var tempMonth= ""+today.getMonth() + 1;
    if(tempDay.length<=1){
        tempDay = "0"+tempDay;
    }
    if(tempMonth.length<=1){
        tempMonth = "0"+tempMonth;
    }
    console.log(tempDay);
    console.log(tempMonth);
    return parseInt(
        today.getFullYear() + "" 
        + tempMonth + "" 
        + tempDay + "" 
        + appendZeroForDate(today.getHours()) + "" 
        + appendZeroForDate(today.getMinutes()));
}

function appendZeroForDate(number) {
    if((number + "").length < 2) {
        number = "0" + number;
    }

    return number;
}

function getPublicKey() {
    return document.getElementById("public-key").textContent;
}

function getPrivateKey() {
    return document.getElementById("private-key").textContent;
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById("overlay").classList.add("card");
    }, 500);
}

function showLoader() {
    document.getElementById("overlay").classList.remove("card");
}


function valideSyncStorageKey(list) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < list.length; i++) {
            await new Promise((resolve, reject) => {
                chrome.storage.sync.get(list[i].key, function (data) {
                    if(data[list[i].key]) {
                        setInformationData(list[i].id, data[list[i].key], list[i].type);
                    } else {
                        setEmptyStorageData(list[i].key);
                        setInformationData(list[i].id, "", list[i].type);
                    }
                    resolve();
                });
            });
        }
        resolve();
    });
}

function setInformationData(id, data, type){
    type == "span" ?
        document.getElementById(id).innerHTML = data
        : document.getElementById(id).value = data;
}

async function setEmptyStorageData(key) {
    if(key == "pbk") {
        await chrome.storage.sync.set({ "pbk": "" });
    } else if(key == "prk") {
        await chrome.storage.sync.set({ "prk": "" });
    } else {
        await chrome.storage.sync.set({ "token": "" });
    }
}


function generateSpan(text) {
    let element = document.createElement("span");
    element.textContent = text;
    return element;
}

function generateDiv(classList, id) {
    let element = document.createElement("div");
    
    if(classList) {
        element.classList.add(classList);
    }

    if(id) {
        element.setAttribute("id", id);
    }

    return element;
}

function generateButton(classList, id, src) {
    let element = document.createElement("div");
    
    if(classList) {
        element.classList.add(classList);
    }

    if(id) {
        element.setAttribute("id", id);
    }

    var icon = document.createElement("img");
    icon.src = src;
    element.appendChild(icon);

    return element;
}


function generateInput(classList, id, type) {
    let element = document.createElement("input");
    
    if(classList) {
        element.classList.add(classList);
    }

    if(id) {
        element.setAttribute("id", id);
    }

    if(type) {
        element.setAttribute("type", type);
    }

    return element;
}