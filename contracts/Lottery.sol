pragma solidity >=0.4.21 <0.6.0;

contract Lottery {
  // Map holding tickets and buyer addresses
  mapping(address => uint8[]) soldTickets;

  function buyTicket(uint8 _ticketNr) public payable {
    require(msg.value >= 1);
    soldTickets[msg.sender].push(_ticketNr);
  }

  function getTickets() public view returns (uint8[] memory) {
    return soldTickets[msg.sender];
  }

  /* function evaluteWinner() public view {

  } */
}

contract RandomNumberGenerator {
  function getRandomNumber() public returns (uint8);
}
