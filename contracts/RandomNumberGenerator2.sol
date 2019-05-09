pragma solidity >=0.4.21 <0.6.0;

//pragma solidity >=0.4.21 <0.5.0;

contract RandomNumberGenerator2 {
    event StorageSet(string _message);

    uint public testData;

    function set(uint x) public {
        testData = x;

        emit StorageSet("Data stored successfully!");
    }

}
