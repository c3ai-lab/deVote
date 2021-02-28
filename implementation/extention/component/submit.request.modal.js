/**
 * Generates dynamically the submit pull request modal
 *
 * @return {void}
 */
async function generateSubmitRequestModal() {
    let modalWindow = generateDiv("modal", "request-modal");
    let requestModal = generateDiv("request-modal");

    let requestModalTitle = generateDiv("request-modal-title");
    let requestModalTitleH2 = generateH2("Submit Pull-Request ID");

    let requestModalBody = generateDiv("request-modal-body");
    let requestModalBodyInput = generateInput("", "request-modal-id", "number", "Pull-Request Id");

    let requestModalActions = generateDiv("modal-actions");
    let requestModalCancel = generateDiv("dark-btn", "cancel-request-modal-btn");
    let requestModalCancelText = generateSpan("Cancel", "");
    let requestModalSubmit = generateDiv("dark-btn", "submit-request-modal-btn");
    let requestModalSubmitText = generateSpan("Submit", "");

    requestModalTitle.appendChild(requestModalTitleH2);

    requestModalBody.appendChild(requestModalBodyInput);

    requestModalCancel.appendChild(requestModalCancelText);
    requestModalSubmit.appendChild(requestModalSubmitText);
    requestModalActions.appendChild(requestModalCancel);
    requestModalActions.appendChild(requestModalSubmit);

    requestModal.appendChild(requestModalTitle);
    requestModal.appendChild(requestModalBody);
    requestModal.appendChild(requestModalActions);

    modalWindow.appendChild(requestModal);
    document.getElementById("deVote-container").appendChild(modalWindow);
}