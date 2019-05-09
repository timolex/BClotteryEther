pragma solidity >=0.4.21 <0.6.0;

contract Lottery {
    uint8 public randNr = 0;

    function getDefinedNumber() public returns (uint8){
        randNr = 5;
        return randNr;
    }
}
