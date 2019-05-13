pragma solidity >=0.4.21 <0.6.0;

contract Lottery {
  enum State { Closed, Open } // Define states as enum

  State lotteryState;
  mapping(address => uint8[]) soldTickets; // Map holding tickets and buyer addresses

  constructor() public {
    lotteryState = State.Closed;
  }

  function buyTicket(uint8 _ticketNr) public payable {
    require(_ticketNr < 251 && _ticketNr > 0, "Ticket number must be in range [0, 250]"); // Prevent overflow of uint8
    require(msg.value >= 1, "A ticket costs 1 Ether"); // Checks if enough ether is sent to buy a lottery ticket
    soldTickets[msg.sender].push(_ticketNr);
  }

  function getOwnTickets() public view returns (uint8[] memory) {
    return soldTickets[msg.sender];
  }

  function getLotteryState() public view returns (State) {
    return lotteryState;
  }

  function setLotteryState(State _lotteryState) public {
    lotteryState = _lotteryState;
  }

}

contract RandomNumberGenerator {
  function getRandomNumber() public returns (uint8);
}
