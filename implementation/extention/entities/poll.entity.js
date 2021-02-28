class Poll {
    constructor(id, issueId, pullId, deliverTimestamp, votingTimestamp, bountyTimestamp, contract, title, url) {
        this.id = id;
        this.issueId = issueId;
        this.pullId = pullId;
        this.deliverTimestamp = deliverTimestamp;
        this.votingTimestamp = votingTimestamp;
        this.bountyTimestamp = bountyTimestamp;
        this.contract = contract;
        this.title = title;
        this.url = url;

    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setIssueId(issueId) {
        this.issueId = issueId;
    }

    getIssueId() {
        return this.issueId;
    }

    setPullId(pullId) {
        this.pullId = pullId;
    }

    getPullId() {
        return this.pullId;
    }

    setDeliverTimestamp(deliverTimestamp) {
        this.deliverTimestamp = deliverTimestamp;
    }

    getDeliverTimestamp() {
        return this.deliverTimestamp;
    }

    setVotingTimestamp(votingTimestamp) {
        this.votingTimestamp = votingTimestamp;
    }

    getVotingTimestamp() {
        return this.votingTimestamp;
    }

    setBountyTimestamp(bountyTimestamp) {
        this.bountyTimestamp = bountyTimestamp;
    }

    getBountyTimestamp() {
        return this.bountyTimestamp;
    }

    setContract(contract) {
        this.contract = contract;
    }

    getContract() {
        return this.contract;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setUrl(url) {
        this.url = url;
    }

    getUrl() {
        return this.url;
    }
}