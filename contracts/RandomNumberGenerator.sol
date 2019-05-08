pragma solidity >=0.4.21 <0.6.0;

//pragma solidity >=0.4.21 <0.5.0;

contract RandomNumberGenerator {
    event StorageSet(string _message);

    event generatedNumber(uint8);
    event numbersArray(uint8[]);

    uint8 public randNr;
    uint8[] private numbers;
    uint8 public myData;

    function set(uint8 x) public {
        myData = x;

        emit StorageSet("Na endlich...!");
    }

    function insertNumbers(uint8 nr) public {
        numbers.push(nr);
        emit numbersArray(numbers);
    }

    function getRandomNumber() public returns (uint8) {

        for (uint8 i = 1; i<numbers.length; ++i) {
            randNr ^= numbers[i];
        }

        //randNr = uint8(uint256(sha3(block.timestamp, block.difficulty))%251);
        randNr = uint8(uint256(keccak256(abi.encode(block.timestamp, block.difficulty)))%251);
        //randNr = uint8(uint256(keccak256(block.timestamp))%251);


        emit generatedNumber(randNr);

        return randNr;
    }

    function getDefinedNumber() public returns (uint8){
        randNr = 5;
        emit generatedNumber(randNr);
        return randNr;
    }

}
