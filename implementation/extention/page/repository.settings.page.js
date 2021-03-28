/**
 * Generates the repository setting buttons
 *
 * @param {any} repository - GitHub repository of the poll
 * @return {void}
 */
async function initRepositorySettings(repository) {
    showLoader();

    openNewView(document.getElementById("repoInfoCard"));
    const response = await getRequest('https://api.github.com/repos/' + repository['owner']['login'] + '/' + repository['name'] + '/collaborators');

    console.log(response);

    if (!response['message']) {
        user.setAdmin(
            response.some(entry => entry['login'] == username) ?
                response.find(entry => entry['login'] == username)['permissions']['admin']
                : false
        );

        // remove old buttons, to prevent multiple event firing
        document.getElementById("showIssuesBtn").remove();
        document.getElementById("showPullsBtn").remove();

        let container = document.getElementById("repository-settings-action");

        let showIssuesBtnText = generateSpan("Issues", "");
        let showIssuesBtn = generateDiv("dark-btn", "showIssuesBtn");
        showIssuesBtn.addEventListener("click", function () {
            initIssueList(repository);
        });

        let showPullsBtnText = generateSpan("Polls", "");
        let showPullsBtn = generateDiv("dark-btn", "showPullsBtn");
        showPullsBtn.addEventListener("click", function () {
            initPollList(repository);
        });

        showIssuesBtn.appendChild(showIssuesBtnText);
        showPullsBtn.appendChild(showPullsBtnText);
        container.appendChild(showIssuesBtn);
        container.appendChild(showPullsBtn);
    } else {
        alert("No access rights!")
        openNewView(document.getElementById("repoCard"));
    }

    hideLoader();
}