/**
 * Generates dynamically the send balance modal
 *
 * @return {void}
 */
 async function generateSendBalanceModal() {
    let modalWindow = generateDiv("modal", "send-modal");
    let sendModal = generateDiv("send-modal");

    let sendModalTitle = generateDiv("send-modal-title");
    let sendModalTitleH2 = generateH2("Send balance");

    let sendModalBody = generateDiv("send-modal-body");
    let sendModalBodyBalance = generateInput("", "send-modal-staking-amount", "number", "Amount to send");
    let sendModalBodyReceiver = generateInput("", "send-modal-staking-receiver", "text", "Receiver address");

    let sendModalActions = generateDiv("modal-actions");
    let sendModalCancel = generateDiv("dark-btn", "cancel-send-modal-btn");
    let sendModalCancelText = generateSpan("Cancel", "");
    let sendModalSend = generateDiv("dark-btn", "submit-send-modal-btn");
    let sendModalSendText = generateSpan("Send", "");

    sendModalTitle.appendChild(sendModalTitleH2);
    sendModalSend.appendChild(sendModalSendText);
    sendModalBody.appendChild(sendModalBodyBalance);
    sendModalBody.appendChild(sendModalBodyReceiver);

    sendModalCancel.appendChild(sendModalCancelText);
    sendModalSend.appendChild(sendModalSendText);
    sendModalActions.appendChild(sendModalCancel);
    sendModalActions.appendChild(sendModalSend);

    sendModal.appendChild(sendModalTitle);
    sendModal.appendChild(sendModalBody);
    sendModal.appendChild(sendModalActions);

    modalWindow.appendChild(sendModal);
    document.getElementById("deVote-container").appendChild(modalWindow);
}