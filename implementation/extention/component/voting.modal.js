/**
 * Generates dynamically the voting modal
 *
 * @return {void}
 */
async function generateVotingModal() {
    let modalWindow = generateDiv("modal", "voting-modal");
    let votingModal = generateDiv("voting-modal");

    let votingModalTitle = generateDiv("voting-modal-title");
    let votingModalTitleH2 = generateH2("Pull-Request Voting");

    let votingModalBody = generateDiv("voting-modal-body");
    let votingModalBodyStake = generateInput("", "voting-modal-staking-amount", "number", "Staking amount (1 = 1e9)");
    let votingModalBodyComment = generateInput("", "voting-modal-comment", "text", "GitHub Comment");
    let votingModalLabelCheckBox= generateLabel("For this pull request", "container");
    let votingModalInputCheckBox= generateInput("", "voting-checkbox", "checkbox", "");
    let votingModalSpanCheckBox= generateSpan("", "checkmark");


    let votingModalActions = generateDiv("modal-actions");
    let votingModalCancel = generateDiv("dark-btn", "cancel-voting-modal-btn");
    let votingModalCancelText = generateSpan("Cancel", "");
    let votingModalSubmit = generateDiv("dark-btn", "submit-voting-modal-btn");
    let votingModalSubmitText = generateSpan("Submit", "");

    votingModalTitle.appendChild(votingModalTitleH2);

    votingModalBody.appendChild(votingModalBodyStake);
    votingModalBody.appendChild(votingModalBodyComment);
    votingModalLabelCheckBox.appendChild(votingModalInputCheckBox);
    votingModalLabelCheckBox.appendChild(votingModalSpanCheckBox);
    votingModalBody.appendChild(votingModalLabelCheckBox);


    votingModalCancel.appendChild(votingModalCancelText);
    votingModalSubmit.appendChild(votingModalSubmitText);
    votingModalActions.appendChild(votingModalCancel);
    votingModalActions.appendChild(votingModalSubmit);

    votingModal.appendChild(votingModalTitle);
    votingModal.appendChild(votingModalBody);
    votingModal.appendChild(votingModalActions);

    modalWindow.appendChild(votingModal);
    document.getElementById("deVote-container").appendChild(modalWindow);

    /* <!-- <div class="modal-window overlay">
      <div class="voting-modal">
        <div class="voting-modal-title">
          <h2>Pull-Request Voting</h2>
        </div>
        <div class="voting-modal-body">
          <input type="number" placeholder="Staking amount">
          <input type="text" placeholder="Comment">
          <label class="container">For this pull request
            <input type="checkbox" checked="checked">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="modal-actions">
          <div id="cancel-voting-modal-btn" class="dark-btn">
            <span>Cancel</span>
          </div>
          <div id="submit-voting-modal-btn" class="dark-btn">
            <span>Submit</span>
          </div>
        </div>
      </div>
    </div> --> */
}