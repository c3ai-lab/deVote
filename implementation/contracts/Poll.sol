pragma solidity >=0.4.22 <0.8.0;

contract Poll {
    struct Vote {
        uint256 id;
        bool decision;
        address payable delegate;
        uint256 weight;
    }

    struct Bounty {
        uint256 id;
        address payable staker;
        uint256 weight;
    }

    Vote[] public votes;
    Bounty[] public bounties;

    uint256 public bounty = 0;
    uint256 public collateral = 0;
    string public claimerName = "";
    address payable public claimerAddress =
        0x28CfbA097FF9bb9D904471c493b032Df45B9f953;

    constructor() public {
        bounties.push(
            Bounty({
                id: 0,
                staker: 0x28CfbA097FF9bb9D904471c493b032Df45B9f953,
                weight: 0
            })
        );

        votes.push(
            Vote({
                id: 0,
                decision: true,
                delegate: 0x28CfbA097FF9bb9D904471c493b032Df45B9f953,
                weight: 0
            })
        );
    }

    function vote(
        bool desc,
        uint256 value,
        address payable addr
    ) public payable {
        votes.push(
            Vote({
                id: votes.length,
                decision: desc,
                delegate: addr,
                weight: value
            })
        );
    }

    function transferStakes(uint256 index, uint256 stake) public payable {
        votes[index].delegate.transfer(stake);
    }

    function transferBounty(uint256 index, uint256 stake) public payable {
        bounties[index].staker.transfer(stake);
    }

    function receiveBounty() public payable {
        claimerAddress.transfer(bounty);
    }

    function addBounty(address payable addr, uint256 value) public payable {
        bounties.push(
            Bounty({id: bounties.length, staker: addr, weight: value})
        );
        bounty = bounty + value;
    }

    function claimIssue(
        address payable addr,
        string memory name,
        uint256 value
    ) public payable {
        collateral = value;
        claimerName = name;
        claimerAddress = addr;
    }

    function resetClaim() public {
        bounty = bounty + collateral;
        collateral = 0;
        claimerName = "";
        claimerAddress = 0x28CfbA097FF9bb9D904471c493b032Df45B9f953;
    }

    function getVotesLength() public view returns (uint256) {
        return votes.length;
    }

    function getBountiesLength() public view returns (uint256) {
        return bounties.length;
    }
}
