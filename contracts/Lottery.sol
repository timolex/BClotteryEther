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

  function getPotOfLotteryRound() public view returns (uint256) {
    return (address(this).balance/(1 ether));
  }

  function getWinners() public {
    /* Here the request to the other contract is issued */
    //uint8 winningNr = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251) + 1;
    winningNr = 5;

    if (playersByTicket[winningNr].length > 0) {
      amountPerAddress = address(this).balance / playersByTicket[winningNr].length;

      for (uint32 i = 0; i < playersByTicket[winningNr].length; i++){
        playersByTicket[winningNr][i].transfer(amountPerAddress);
        winners = playersByTicket[winningNr];
      }
    }
    emptyMapping();
  }

  function printWinnerAccount() public view returns (address payable[] memory) {
    return winners;
  }

  function emptyMapping() private {
    for (uint256 i = 0; i<allPlayedNumbers.length; i++){
      delete playersByTicket[allPlayedNumbers[i]];
    }
    for (uint256 i = 0; i<allPlayers.length; i++){
      delete soldTickets[allPlayers[i]];
    }
    delete allPlayedNumbers;
    delete allPlayers;
  }
}

contract RandomNumberGenerator {
  function getRandomNumber() public returns (uint8);
}
