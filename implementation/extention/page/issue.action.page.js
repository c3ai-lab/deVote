/**
 * Generates the actions for the issues
 *
 * @param {Issue} issue - Chosen issue
 * @param {any} repository - GitHub repository of the issue
 * @return {void}
 */
async function initIssueAction(issue, repository) {

    while (issue_actions.firstChild) {
        issue_actions.removeChild(issue_actions.lastChild);
    }

    if (issue.getSaveable()) {
        document.getElementById('issue-title-container').style.display = "none";
        document.getElementById('issue-stake-container').style.display = "none";

    } else {
        document.getElementById('issue-title-container').style.display = "block";
        document.getElementById('issue-stake-container').style.display = "block";

        showLoader();
        const bountySum = await getBounty(issue);
        document.getElementById('issue-title').textContent = issue.getTitle();
        document.getElementById('issue-stake').textContent = "Bounty: " + bountySum + " ETH";
        hideLoader();
    }


    openNewView(document.getElementById("issueActionCard"));

    if (user.getAdmin() && issue.getSaveable()) {
        let createBountyBtn = generateDiv("dark-btn", "createBountyBtn");
        let createBountyBtnText = generateSpan("Create Bounty-Pool", "");

        createBountyBtn.addEventListener("click", async function () {
            showLoader();
            const published_contract = await createIssueContract();
            await appendIssueContract(published_contract, issue, repository, generatePollEnd(bounty_minutes));
            openNewView(document.getElementById("menuCard"));
            hideLoader();
        });

        createBountyBtn.appendChild(createBountyBtnText);
        document.getElementById('issue-settings-actions').appendChild(createBountyBtn);
    }


    if (!issue.getSaveable()) {
        let stakeBountyBtn = generateDiv("dark-btn", "stakeBountyBtn");
        let stakeBountyBtnText = generateSpan("Stake in Bounty-Pool", "");

        stakeBountyBtnText.addEventListener("click", async function () {

            generateBountyStakingModal();

            document.getElementById("cancel-bounty-modal-btn").addEventListener("click", function () {
                document.getElementById("bounty-modal").remove();
            });

            document.getElementById("submit-bounty-modal-btn").addEventListener("click", async function () {
                let stake = document.getElementById("bounty-modal-id").value;
                if (stake > 0) {
                    showLoader();
                    await stakeOnBounty(issue, stake * 1000000000);
                    document.getElementById("bounty-modal").remove();
                    openNewView(document.getElementById("menuCard"))
                    hideLoader();
                } else {
                    alert("Please insert a valid number!")
                }
            });
        });

        stakeBountyBtn.appendChild(stakeBountyBtnText);
        document.getElementById('issue-settings-actions').appendChild(stakeBountyBtn);
    }

    if (!issue.getSaveable()) {
        let claimIssueBtn = generateDiv("dark-btn", "claimIssueBtn");
        let claimIssueBtnText = generateSpan("Claim Issue", "");

        claimIssueBtn.addEventListener("click", async function () {
            showLoader();
            await claimIssue(issue, user.getUsername(), developer_collateral);
            await setPollStateInManager(issue.getPollId(), 2);
            await initPollTimers(issue.getPollId(), generatePollEnd(developer_minutes), generatePollEnd(voting_minutes));
            openNewView(document.getElementById("menuCard"))
            hideLoader();
        });

        claimIssueBtn.appendChild(claimIssueBtnText);
        document.getElementById('issue-settings-actions').appendChild(claimIssueBtn);
    }
}
