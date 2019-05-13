pragma solidity >=0.4.21 <0.6.0;

contract Lottery {
  enum State { Closed, Open } // Define states as enum

  State lotteryState;
  mapping(address => uint32[]) soldTickets; // Map holding tickets and buyer addresses
  mapping(uint32 => address payable[]) playersByTicket; // Map holding tickets and buyer addresses
  uint256 public amountPerAddress;
  uint32 public winningNr;
  uint32[] allPlayedNumbers;
  address payable[] allPlayers;
  address payable[] winners;

  constructor() public {
    lotteryState = State.Closed;
  }

  function buyTicket(uint32 _ticketNr) public payable {
    require(_ticketNr < 251 && _ticketNr > 0, "Ticket number must be in range [0, 250]");
    require(msg.value >= 1, "A ticket costs 1 Ether"); // Checks if enough ether is sent to buy a lottery ticket
    soldTickets[msg.sender].push(_ticketNr);
    playersByTicket[_ticketNr].push(msg.sender);
    allPlayedNumbers.push(_ticketNr);
    allPlayers.push(msg.sender);
  }

  function getOwnTickets() public view returns (uint32[] memory) {
    return soldTickets[msg.sender];
  }

  function getLotteryState() public view returns (State) {
    return lotteryState;
  }

  function setLotteryState(State _lotteryState) public {
    lotteryState = _lotteryState;
  }
  
  function callOracle(address _oracleAddress) public {
    RandomNumberGenerator oracle = RandomNumberGenerator(_oracleAddress);
    /* uint8 winnerNr = oracle.getRandomNumber(); */
  }


}

contract RandomNumberGenerator {
  function getRandomNumber() public returns (uint8);
}
