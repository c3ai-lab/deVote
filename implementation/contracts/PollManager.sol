pragma solidity >=0.4.22 <0.8.0;

contract PollManager {
    struct Poll {
        uint256 id;
        uint256 rpId;
        uint256 issueId;
        uint256 pqId;
        string poll_contract_address;
        uint256 state;
        string bountyTimestamp;
        string deliverTimestamp;
        string votingTimestamp;
    }

    Poll[] public polls;

    constructor() public {
        polls.push(
            Poll({
                id: 0,
                rpId: 0,
                issueId: 0,
                pqId: 0,
                poll_contract_address: "0x0",
                state: 0,
                deliverTimestamp: "",
                votingTimestamp: "",
                bountyTimestamp: ""
            })
        );
    }

    function addPoll(
        uint256 _rpId,
        uint256 _issueId,
        uint256 _pqId,
        string memory addr,
        string memory _deliverTimestamp,
        string memory _votingTimestamp,
        string memory _bountyTimestamp
    ) public {
        polls.push(
            Poll({
                id: polls.length,
                rpId: _rpId,
                issueId: _issueId,
                pqId: _pqId,
                poll_contract_address: addr,
                state: 1,
                deliverTimestamp: _deliverTimestamp,
                votingTimestamp: _votingTimestamp,
                bountyTimestamp: _bountyTimestamp
            })
        );
    }

    function initPollPhases(uint256 index, string memory _deliverTimestamp, string memory _votingTimestamp) public {
        polls[index].deliverTimestamp = _deliverTimestamp;
        polls[index].votingTimestamp = _votingTimestamp;
    }

    function cancelPoll(uint256 index) public {
        polls[index].issueId = 0;
        polls[index].state = 0;
    }

    function updatePoll(uint256 index, uint256 state) public {
        polls[index].state = state;
    }

    function submitPullRequest(uint256 index, uint256 pqId) public {
        polls[index].pqId = pqId;
    }

    function getPollsLength() public view returns (uint256) {
        return polls.length;
    }

    function helloWorld() public pure returns (string memory) {
        return "VOTE: Hallo Nico";
    }
}
