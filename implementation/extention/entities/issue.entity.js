class Issue {
    constructor(id, pollId, title, url, saveable, contract) {
        this.id = id;
        this.pollId = pollId;
        this.title = title;
        this.url = url;
        this.saveable = saveable;
        this.contract = contract;

    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setPollId(pollId) {
        this.pollId = pollId;
    }

    getPollId() {
        return this.pollId;
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

    setSaveable(saveable) {
        this.saveable = saveable;
    }

    getSaveable() {
        return this.saveable;
    }

    setContract(contract) {
        this.contract = contract;
    }

    getContract() {
        return this.contract;
    }
}