pragma solidity >=0.4.21 <0.6.0;

contract Lottery {
  enum State { Closed, Open } // Define states as enum

  State lotteryState;
  mapping(address => uint8[]) soldTickets; // Map holding tickets and buyer addresses
  mapping(uint8 => address payable[]) playersByTicket; // Map holding tickets and buyer addresses
  uint256 public amountPerAddress;
  uint8 public winningNr;

  constructor() public {
    lotteryState = State.Closed;
  }

  function buyTicket(uint8 _ticketNr) public payable {
    require(_ticketNr < 251 && _ticketNr > 0, "Ticket number must be in range [0, 250]"); // Prevent overflow of uint8
    require(msg.value >= 1, "A ticket costs 1 Ether"); // Checks if enough ether is sent to buy a lottery ticket
    soldTickets[msg.sender].push(_ticketNr);
    playersByTicket[_ticketNr].push(msg.sender);
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

  function getPotOfLotteryRound() public view returns (uint256) {
    return (address(this).balance/(1 ether));
  }

  function getWinners() public payable {
    //uint8 winningNr = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251) + 1;
    winningNr = 5;

    if (playersByTicket[winningNr].length > 0) {
      amountPerAddress = address(this).balance / playersByTicket[winningNr].length;

      for (uint8 i = 0; i < playersByTicket[winningNr].length; i++){
        playersByTicket[winningNr][i].transfer(amountPerAddress);
      }

    } else {
      /* no winner*/
    }
  }

  function printWinnerAccount() public view returns (address payable[] memory) {
    return playersByTicket[winningNr];
  }
}

contract RandomNumberGenerator {
  function getRandomNumber() public returns (uint8);
}
