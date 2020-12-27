pragma solidity >=0.4.22 <0.8.0;

contract Incrementer {
    uint256 public number;

    constructor() public {
        number = 2;
    }

    function increment(uint256 _value) public {
        number = _value;
    }

    function reset() public {
        number = 0;
    }

    function getPollsLength() public view returns (uint256) {
        return number;
    }
}
