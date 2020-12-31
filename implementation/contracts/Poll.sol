pragma solidity >=0.4.22 <0.8.0;

contract Poll {
    struct Vote {
        uint256 id;
        bool decision;
        address payable delegate;
        uint256 weight;
    }

    Vote[] public votes;

    constructor() public {
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

    function getVotesLength() public view returns (uint256) {
        return votes.length;
    }
}
