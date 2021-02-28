/**
 * Generates the actions for the polls
 *
 * @param {Issue} poll - Chosen poll
 * @param {any} repository - GitHub repository of the poll
 * @return {void}
 */
async function initPollAction(poll, repository) {
    openNewView(document.getElementById("pollActionCard"));

    while (poll_actions.firstChild) {
        poll_actions.removeChild(poll_actions.lastChild);
    }

    document.getElementById('poll-title').textContent = poll.getTitle();

    if (poll.getPullId() > 0) {
        document.getElementById('poll-title').textContent = "Pull request was submitted!";
        document.getElementById("poll-time").textContent = formateTime(poll.getVotingTimestamp());
    } else {
        document.getElementById('poll-title').textContent = "Currently a pull request is not submitted!"
    }


    let single_poll_contract = new web3.eth.Contract(poll_contract_abi, poll.getContract());
    let claimerName = await single_poll_contract.methods.claimerName().call();


    if (claimerName == user.getUsername()) {
        let submitPullRequestBtn = generateDiv("dark-btn", "submitPullRequestBtn");
        let submitPullRequestBtnText = generateSpan("Submit pull request ID", "");

        submitPullRequestBtn.addEventListener("click", async function () {
            generateSubmitRequestModal();
            document.getElementById("cancel-request-modal-btn").addEventListener("click", function () {
                document.getElementById("request-modal").remove();
            });

            document.getElementById("request-modal-id").value = poll.getPullId();

            document.getElementById("submit-request-modal-btn").addEventListener("click", async function () {
                let id = document.getElementById("request-modal-id").value;
                if (id > 0) {
                    showLoader();
                    await submitPullRequest(poll.getId(), id);
                    document.getElementById("request-modal").remove();
                    openNewView(document.getElementById("menuCard"));
                    hideLoader();
                } else {
                    alert("Please insert a valid pull request id!")
                }
            });
        });

        submitPullRequestBtn.appendChild(submitPullRequestBtnText);
        document.getElementById('poll-settings-actions').appendChild(submitPullRequestBtn);
    }

    if (poll.getPullId() > 0) {
        let votePullRequestBtn = generateDiv("dark-btn", "votePullRequestBtn");
        let votePullRequestBtnText = generateSpan("Voting on pull request", "");

        votePullRequestBtn.addEventListener("click", async function () {
            generateVotingModal();

            document.getElementById("cancel-voting-modal-btn").addEventListener("click", function () {
                document.getElementById("voting-modal").remove();
            });

            document.getElementById("submit-voting-modal-btn").addEventListener("click", async function () {
                let stake = document.getElementById("voting-modal-staking-amount").value;
                let comment = document.getElementById("voting-modal-comment").value;
                let checked = document.getElementById("voting-checkbox").checked;

                if (stake > 0 && comment) {
                    showLoader();
                    await addVote(poll.getContract(), stake * 1000000000, checked);
                    await createIssueComment("https://api.github.com/repos/SerQuicky/Example-Cryptosystem/issues/5/comments", comment);
                    document.getElementById("voting-modal").remove();
                    openNewView(document.getElementById("menuCard"));
                    hideLoader();
                } else {
                    alert("The stake amount has to be higher than zero and a comment has to be set!")
                }
            });
        });

        votePullRequestBtn.appendChild(votePullRequestBtnText);
        document.getElementById('poll-settings-actions').appendChild(votePullRequestBtn);
    }

    if (poll.getPullId() > 0) {
        let votePullLinkBtn = generateDiv("dark-btn", "votePullLinkBtn");
        let votePullLinkBtnText = generateSpan("Open pull request", "");

        votePullLinkBtn.addEventListener("click", function () {
            let url = repository['pulls_url'];
            let link = (url.substring(0, url.length - 9) + "/" + poll.getPullId()).replace('api.', '').replace('repos/', '');
            window.open(link, '_blank')
        });

        votePullLinkBtn.appendChild(votePullLinkBtnText);
        document.getElementById('poll-settings-actions').appendChild(votePullLinkBtn);
    }
}
