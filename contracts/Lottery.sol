pragma solidity >=0.4.21 <0.6.0;

contract Lottery {
  enum State { Closed, Open } // Define states as enum

  State lotteryState;
  mapping(address => uint32[]) soldTickets;                // Map holding all tickets by address
  mapping(uint32 => address payable[]) playersByTicket;    // Map holding all addresses by ticket
  uint256 public amountPerAddress;    //Winnable amount per player.
  uint32 public winningNr;            //Winning number
  uint32[] allPlayedNumbers;          //Array of all played numbers
  address payable[] allPlayers;       //Array of all players
  address payable[] winners;          //Array of winners.
  address public owner;                      //Address of the contract owner

  //Constructor which is called directly after deploying the contract.
  constructor() public {
    lotteryState = State.Closed;
    owner = msg.sender;
  }

  //Here players can buy tickets when the inserted number is bewtween 1 and 250 and 1Ether is stake
  function buyTicket(uint32 _ticketNr) public payable {
    require(_ticketNr < 251 && _ticketNr > 0, "Ticket number must be in range [0, 250]");   // Prevent overflow of uint32
    require(msg.value >= 1, "A ticket costs 1 Ether");    // Checks if enough ether is sent to buy a lottery ticket

    //Check if PLayer already played --> Prevention of duplicates in allPlayersArray.
    if (soldTickets[msg.sender].length == 0) {
      allPlayers.push(msg.sender);
    }

    //Add Addresses and ticketnumer to the correct mappings and arrays
    soldTickets[msg.sender].push(_ticketNr);
    playersByTicket[_ticketNr].push(msg.sender);
    allPlayedNumbers.push(_ticketNr);
  }

  //Get tickets played by a user
  function getOwnTickets() public view returns (uint32[] memory) {
    return soldTickets[msg.sender];
  }

  function getLotteryState() public view returns (State) {
    return lotteryState;
  }

  function setLotteryState(State _lotteryState) public {
    lotteryState = _lotteryState;
  }

  function getRandomNumberFromOracle(address _oracleAddress) public returns (uint32) {
    RandomNumberGenerator oracle = RandomNumberGenerator(_oracleAddress);
    return oracle.getRandomNumber();
  }

  function getPotOfLotteryRound() public view returns (uint256) {
    return (address(this).balance/(1 ether));
  }

  function drawWinners(address _oracleAddress) public {
    winningNr = getRandomNumberFromOracle(_oracleAddress);

    if (playersByTicket[winningNr].length > 0) {
      //Get the won amount per winner
      amountPerAddress = address(this).balance / playersByTicket[winningNr].length;

      for (uint32 i = 0; i < playersByTicket[winningNr].length; ++i){
        playersByTicket[winningNr][i].transfer(amountPerAddress);
        winners = playersByTicket[winningNr];
      }
    }

    //Empty the mappings for a new round --> May move this to the state where a new round is opened.
    emptyMapping();
  }

  //Used to print the winners in the frontend.
  function printWinnerAccount() public view returns (address payable[] memory) {
    return winners;
  }

  //Emptying of the mappings and arrays, such that a new round can be started.
  function emptyMapping() private {

    //delete the playersByTicket mapping
    for (uint256 i = 0; i<allPlayedNumbers.length; ++i){
      delete playersByTicket[allPlayedNumbers[i]];
    }

    //delete the soldTickets mapping
    for (uint256 i = 0; i<allPlayers.length; ++i){
      delete soldTickets[allPlayers[i]];
    }

    //Delete the two helper arrays.
    delete allPlayedNumbers;
    delete allPlayers;
  }
}

//Interface
contract RandomNumberGenerator {
  function getRandomNumber() public returns (uint32);
}
