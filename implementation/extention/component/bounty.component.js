/**
 * Generates dynamically the bounty staking modal
 *
 * @return {void}
 */
async function generateBountyStakingModal() {
  let modalWindow = generateDiv("modal", "bounty-modal");
  let bountyModal = generateDiv("bounty-modal");

  let bountyModalTitle = generateDiv("bounty-modal-title");
  let bountyModalTitleH2 = generateH2("Add bounty");

  let bountyModalBody = generateDiv("bounty-modal-body");
  let bountyModalBodyInput = generateInput("", "bounty-modal-id", "number", "Staking amount (1 = 1e9)");

  let bountyModalActions = generateDiv("modal-actions");
  let bountyModalCancel = generateDiv("dark-btn", "cancel-bounty-modal-btn");
  let bountyModalCancelText = generateSpan("Cancel", "");
  let bountyModalSubmit = generateDiv("dark-btn", "submit-bounty-modal-btn");
  let bountyModalSubmitText = generateSpan("Submit", "");

  bountyModalTitle.appendChild(bountyModalTitleH2);

  bountyModalBody.appendChild(bountyModalBodyInput);

  bountyModalCancel.appendChild(bountyModalCancelText);
  bountyModalSubmit.appendChild(bountyModalSubmitText);
  bountyModalActions.appendChild(bountyModalCancel);
  bountyModalActions.appendChild(bountyModalSubmit);

  bountyModal.appendChild(bountyModalTitle);
  bountyModal.appendChild(bountyModalBody);
  bountyModal.appendChild(bountyModalActions);

  modalWindow.appendChild(bountyModal);
  document.getElementById("deVote-container").appendChild(modalWindow);
}