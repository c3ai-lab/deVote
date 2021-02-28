/**
 * Formats a numeric date string to a normale date format 
 *
 * @param {string} str - numeric date string
 * @return {string} - normal date string
 */
function formateTime(str) {
    return str.substr(6, 2) + "." + str.substr(4, 2) + "." + str.substr(0, 4) + " " + str.substr(8, 2) + ":" + str.substr(10, 2);
}

/**
 * Calculates the ending date for a poll by an offset
 *
 * @param {number} minutes - offset to add
 * @return {string} - numeric date string
 */
function generatePollEnd(minutes) {
    let initial_date = new Date;
    let today = new Date(initial_date.getTime() + (minutes * 60 * 1000));

    var tempDay = "" + appendZeroForDate(today.getDate());
    var tempMonth = "" + (today.getMonth() + 1);

    if (tempDay.length <= 1) {
        tempDay = "0" + tempDay;
    }

    if (tempMonth.length <= 1) {
        tempMonth = "0" + tempMonth;
    }

    return today.getFullYear() + ""
        + tempMonth + ""
        + tempDay + ""
        + appendZeroForDate(today.getHours()) + ""
        + appendZeroForDate(today.getMinutes());
}

/**
 * Limit or cut the length of a string if its above a threshold
 *
 * @param {string} str - String that should be limited
 * @return {string} - limited string
 */
function formateName(str) {
    return str.length > 30 ? str.substr(0, 30) + "..." : str;
}

/**
 * Get the current date as an numeric date string
 *
 * @return {string} - numeric date string
 */
function getCurrentDate() {
    let today = new Date();
    var tempDay = "" + appendZeroForDate(today.getDate());
    var tempMonth = "" + (today.getMonth() + 1);
    if (tempDay.length <= 1) {
        tempDay = "0" + tempDay;
    }
    if (tempMonth.length <= 1) {
        tempMonth = "0" + tempMonth;
    }
    return parseInt(
        today.getFullYear() + ""
        + tempMonth + ""
        + tempDay + ""
        + appendZeroForDate(today.getHours()) + ""
        + appendZeroForDate(today.getMinutes()));
}

/**
 * Fill a date part with a zero
 *
 * @param {number} number - date part
 * @return {number} - filled date part
 */
function appendZeroForDate(number) {
    if ((number + "").length < 2) {
        number = "0" + number;
    }

    return number;
}

/**
 * Get public address of the wallet
 *
 * @return {string} - public address
 */
function getPublicKey() {
    return document.getElementById("public-key").textContent;
}

/**
 * Get private key of the wallet
 *
 * @return {string} - private key
 */
function getPrivateKey() {
    return document.getElementById("private-key").textContent;
}

/**
 * Hide the waiting loader
 *
 * @return {void}
 */
function hideLoader() {
    setTimeout(() => {
        document.getElementById("overlay").classList.add("card");
    }, 500);
}

/**
 * Show the waiting loader
 *
 * @return {void}
 */
function showLoader() {
    document.getElementById("overlay").classList.remove("card");
}

/**
 * Extract the date from the synched storage
 *
 * @param {any[]} list - list of attributes to extract
 * @return {Promise<any>} - Response that the process finished
 */
function valideSyncStorageKey(list) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < list.length; i++) {
            await new Promise((resolve, reject) => {
                chrome.storage.sync.get(list[i].key, function (data) {
                    if (data[list[i].key]) {
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

/**
 * Saves the extracted date in HTML elements
 *
 * @param {any[]} id - id of the element
 * @param {any[]} data - data to be saved
 * @param {any[]} type - type of the element
 * @return {void}
 */
function setInformationData(id, data, type) {
    type == "span" ?
        document.getElementById(id).innerHTML = data
        : document.getElementById(id).value = data;
}

/**
 * Save empty values in the synched storage to prevent errors
 *
 * @param {string} key - id of the key
 * @return {void}
 */

async function setEmptyStorageData(key) {
    if (key == "pbk") {
        await chrome.storage.sync.set({ "pbk": "" });
    } else if (key == "prk") {
        await chrome.storage.sync.set({ "prk": "" });
    } else {
        await chrome.storage.sync.set({ "token": "" });
    }
}

/**
 * Generates a span element
 *
 * @param {string} text - text of the span element
 * @param {string} classList - css classes of the span element
 * @return {HTMLElement} - Created span
 */
function generateSpan(text, classList) {
    let element = document.createElement("span");
    element.textContent = text;

    if (classList) {
        element.classList.add(classList);
    }

    return element;
}

/**
 * Generates a div element
 *
 * @param {string} classList - css classes of the div element
 * @param {string} id - id of the div element
 * @return {HTMLElement} - Created div
 */
function generateDiv(classList, id) {
    let element = document.createElement("div");

    if (classList) {
        element.classList.add(classList);
    }

    if (id) {
        element.setAttribute("id", id);
    }

    return element;
}

/**
 * Generates a button (div) element
 *
 * @param {string} classList - css classes of the div element
 * @param {string} id - id of the div element
 * @param {string} src - icon source
 * @return {HTMLElement} - Created button (div)
 */
function generateButton(classList, id, src) {
    let element = document.createElement("div");

    if (classList) {
        element.classList.add(classList);
    }

    if (id) {
        element.setAttribute("id", id);
    }

    var icon = document.createElement("img");
    icon.src = src;
    element.appendChild(icon);

    return element;
}

/**
 * Generates an input element
 *
 * @param {string} classList - css classes of the input
 * @param {string} id - id of the input
 * @param {string} type - type of the input (text, number, etc.)
 * @param {string} placeholder - placeholder text of the input
 * @return {HTMLElement} - Created input
 */
function generateInput(classList, id, type, placeholder) {
    let element = document.createElement("input");

    if (classList) {
        element.classList.add(classList);
    }

    if (id) {
        element.setAttribute("id", id);
    }

    if (type) {
        element.setAttribute("type", type);
    }

    if (placeholder) {
        element.setAttribute("placeholder", placeholder);
    }

    return element;
}

/**
 * Generates an h2 element
 *
 * @param {string} text - text of the h2 element
 * @return {HTMLElement} - Created h2
 */
function generateH2(text) {
    let element = document.createElement("h2");
    element.textContent = text;
    return element;
}

/**
 * Generates an label element
 *
 * @param {string} text - text of the label element
 * @param {string} classList - css of the label element
 * @return {HTMLElement} - Created label
 */
function generateLabel(text, classList) {
    let element = document.createElement("label");
    element.textContent = text;

    if (classList) {
        element.classList.add(classList);
    }

    return element;
}

