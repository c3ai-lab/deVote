pragma solidity >=0.4.22 <0.8.0;

contract PollManager {
    struct Poll {
        uint256 id;
        uint256 rpId;
        uint256 pqId;
        string poll_contract_address;
        bool open;
        string timestamp;
    }

    Poll[] public polls;

    constructor() public {
        polls.push(Poll({id: 0, rpId: 0, pqId: 0, poll_contract_address: "0x0", open: false, timestamp: ""}));
    }

    function addPoll(uint256 _rpId, uint256 _pqId,  string memory addr, string memory _timestamp) public {
        polls.push(Poll({id: polls.length, rpId: _rpId, pqId: _pqId, poll_contract_address: addr, open: true, timestamp: _timestamp}));
    }

    function closePoll(uint256 index) public {
        polls[index].open = false;
    }

    function getPollsLength() public view returns (uint256) {
        return polls.length;
    }

    function helloWorld() public pure returns (string memory) {
        return "VOTE: Hallo Nico";
    }
}
