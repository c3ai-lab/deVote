/**
 * Generates issue list element
 *
 * @param {Issue} issue - Chosen issue
 * @param {any} repository - GitHub repository of the issue
 * @return {void}
 */
function generateIssueComponent(issue, repository) {
    let issueElement = document.createElement("div");
    let issueTitle = generateSpan(formateName(issue.getTitle()), "");
    
    issueElement.classList.add("issue-element");
    issueElement.addEventListener("click", function () {
        initIssueAction(issue, repository);
    });
    
    issueElement.appendChild(issueTitle);
    issuesList.appendChild(issueElement);
}