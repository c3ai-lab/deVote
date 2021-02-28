/**
 * Generates poll list element
 *
 * @param {Poll} poll - Chosen poll
 * @param {any} repository - GitHub repository of the issue
 * @return {void}
 */
function generatePollComponent(poll, repository) {

    let pollElement = document.createElement("div");
    let pollTitle = generateSpan(formateName(poll.getTitle()), "");

    pollElement.classList.add("repository-element");
    pollElement.addEventListener("click", function () {
        initPollAction(poll, repository);
    });

    pollElement.appendChild(pollTitle);
    pollsList.appendChild(pollElement);
}