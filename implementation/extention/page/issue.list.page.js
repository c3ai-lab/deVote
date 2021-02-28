/**
 * Generates the issue lists
 *
 * @param {any} repository - Chosen GitHub repository
 * @return {void}
 */
async function initIssueList(repository) {

    showLoader();
    openNewView(document.getElementById("issuesCard"));

    while (issuesList.firstChild) {
        issuesList.removeChild(issuesList.lastChild);
    }

    const issues = await getIssues(repository);
    issues.forEach(issue => {
        generateIssueComponent(issue, repository);
    });
    hideLoader();
}
