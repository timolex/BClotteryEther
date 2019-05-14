pragma solidity >=0.4.21 <0.6.0;

contract RandomNumberGenerator {
    uint32 public randNr = 0;

    function getRandomNumber() public returns (uint32) {
        randNr = uint32(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251) + 1;
        return randNr;
    }
}
