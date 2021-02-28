/**
 * Fetches date through a GET request from an endpoint
 *
 * @param {string} url - url of the endpoint
 * @return {Promise<any>} - Endpoint response
 */
function getRequest(url) {
    return fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + user.getToken(),
        }),
    })
    .then(response => response.json()) //Converting the response to a JSON object
    
}

/**
 * Merge a pull request
 *
 * @param {string} url - url of the endpoint
 * @param {string} sha - sha of the pull request
 * @return {Promise<any>} - Endpoint response
 */
function mergePullRequest(url, sha) {
    return fetch(url, {
        method: 'PUT',
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + document.getElementById('cred-token').value,
        }),
        body: JSON.stringify({
            "sha": sha,
            "merge_method": "merge",
            "commit_title": "Community Merge",
            "commit_message": "The community decided to merge this pull request."
        })
    })
    .then(response => response.json()) //Converting the response to a JSON object
}

/**
 * Reject a pull request
 *
 * @param {string} url - url of the endpoint
 * @param {string} sha - sha of the pull request
 * @return {Promise<any>} - Endpoint response
 */
function rejectPullRequest(url) {
    return fetch(url, {
        method: 'PATCH',
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + document.getElementById('cred-token').value,
        }),
        body: JSON.stringify({
            "state": "closed"
        })
    })
    .then(response => response.json())
}

/**
 * Post a comment in an issue post
 *
 * @param {string} url - url of the endpoint
 * @param {string} comment - comment to post
 * @return {Promise<any>} - Endpoint response
 */
function createIssueComment(url, comment) {
    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + user.getToken(),
        }),
        body: JSON.stringify({
            "body": comment
        })
    })
    .then(response => response.json())
}