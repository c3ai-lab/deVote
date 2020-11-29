pragma solidity >=0.4.22 <0.8.0;

contract Counter {
    uint256 counter;

    constructor() public {
        counter = 3; // Initialise the counter to 0
    }

    function increment() public {
        counter++;
    }

    function test2() public {
        counter++;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function helloWorld() public pure returns (string memory) {
        return "VOTE: Hallo Nico";
    }
}
