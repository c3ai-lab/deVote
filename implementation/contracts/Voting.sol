pragma solidity >=0.4.22 <0.8.0;

contract Voting {
    struct Poll {
        uint256 id;
        uint256 rpId;
        uint256 pqId;
        string pqLink;
        string pqTitle;
        string time;
    }

    struct Vote {
        uint256 poll;
        bool decision;
        address delegate;
        uint weight;
    }

    event Deposit(address indexed _from, uint256 indexed _id, uint256 _value);

    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);

    Poll[] public polls;
    Vote[] public votes;


    constructor() public {
        polls.push(
            Poll({
                id: 0,
                rpId: 70107786,
                pqId: 19815,
                pqLink: "https://github.com/vercel/next.js/pull/19815",
                pqTitle: "fix: webpack 5 invalid config error",
                time: "202012151745"
            })
        );

        votes.push(
            Vote({
                poll: 0,
                decision: true,
                delegate: 0x22A5206a65Aaf639C4d446F29586F0c00e0F7Fa9,
                weight: 10
            })
        );
    }

    function addNewPoll(
        uint256 _rpId,
        uint256 _pqId,
        string memory _pqLink,
        string memory _pqTitle,
        string memory _time,
        uint value,
        address addr
    ) public payable {

        polls.push(
            Poll({
                id: polls.length,
                rpId: _rpId,
                pqId: _pqId,
                pqLink: _pqLink,
                pqTitle: _pqTitle,
                time: _time
            })
        );

        votes.push(
            Vote({
                poll: polls.length - 1,
                decision: true,
                delegate: addr,
                weight: value
            })
        );
    }

    function vote(uint256 _pollId, bool _decision, uint value, address addr) public payable{
        votes.push(
            Vote({
                poll: _pollId,
                decision: _decision,
                delegate: addr,
                weight: value
            })
        );
    }

    function deposit() public payable {
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw() public {
        uint256 balance = address(this).balance;
        msg.sender.transfer(balance);
        emit Withdrawn(msg.sender, balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getVotesLength() public view returns (uint256) {
        return votes.length;
    }

    function getPollsLength() public view returns (uint256) {
        return polls.length;
    }

    function helloWorld() public pure returns (string memory) {
        return "VOTE: Hallo Nico";
    }
}
