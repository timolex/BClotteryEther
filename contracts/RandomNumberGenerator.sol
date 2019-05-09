pragma solidity >=0.4.21 <0.6.0;

contract RandomNumberGenerator {
    uint8 public randNr = 0;

    function getRandomNumber() public returns (uint8) {
        randNr = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251);
        return randNr;
    }

    function getDefinedNumber() public returns (uint8){
        randNr = 5;
        return randNr;
    }

}
