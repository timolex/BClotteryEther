pragma solidity >=0.4.21 <0.6.0;

contract SimpleStorage {
    event StorageSet(string _message);

    uint public storedData;
    uint public storedNumber;

    function set(uint x, uint y) public {
        storedData = x;
        storedNumber = y;

        emit StorageSet("Data stored successfully!");
    }
}
