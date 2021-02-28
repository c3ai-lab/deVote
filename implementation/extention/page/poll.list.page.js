/**
 * Generates the poll lists
 *
 * @param {any} repository - Chosen GitHub repository
 * @return {void}
 */
async function initPollList(repository) {
    showLoader();
    openNewView(document.getElementById("pollsCard"));

    while (pollsList.firstChild) {
        pollsList.removeChild(pollsList.lastChild);
    }

    const polls = await getPolls(repository);
    polls.forEach(poll => {
        generatePollComponent(poll, repository);
    });
    hideLoader();
}
