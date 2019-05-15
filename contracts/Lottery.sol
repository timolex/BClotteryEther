pragma solidity >=0.4.21 <0.6.0;

contract Lottery {
  enum State { Closed, Open }
  enum Mode { Prod, Dev }

  State public lotteryState;
  mapping(address => uint32[]) soldTickets;                // Map holding all tickets by address
  mapping(uint32 => address payable[]) playersByTicket;    // Map holding all addresses by ticket
  uint256 public amountPerAddress;    // Winnable amount per player.
  uint32 public winningNr;            // Winning number
  uint32 winningNrDev = 5;
  uint32[] allPlayedNumbers;          // Array of all played numbers
  address payable[] allPlayers;       // Array of all players
  address public owner;               // Address of the contract owner

  // Constructor which is called directly after deploying the contract.
  constructor() public {
    lotteryState = State.Open;
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }

  // Here players can buy tickets when the inserted number is bewtween 1 and 250 and 1Ether is stake
  function buyTicket(uint32 _ticketNr) public payable {
    require(lotteryState == State.Open, "Lottery is closed");
    require(_ticketNr < 251 && _ticketNr > 0, "Ticket number must be in range [0, 250]");
    require(msg.value >= 1, "A ticket costs 1 Ether");    // Checks if enough ether is sent to buy a lottery ticket

    // Check if PLayer already played --> Prevention of duplicates in allPlayersArray.
    if (soldTickets[msg.sender].length == 0) {
      allPlayers.push(msg.sender);
    }

    // Add Addresses and ticketnumer to the correct mappings and arrays
    soldTickets[msg.sender].push(_ticketNr);
    playersByTicket[_ticketNr].push(msg.sender);
    allPlayedNumbers.push(_ticketNr);
  }

  // Get tickets played by a user
  function getOwnTickets() public view returns (uint32[] memory) {
    return soldTickets[msg.sender];
  }

  function openLottery() public onlyOwner {
    lotteryState = State.Open;
    emptyMapping();
  }

  function getRandomNumberFromOracle(address _oracleAddress) public returns (uint32) {
    RandomNumberGenerator oracle = RandomNumberGenerator(_oracleAddress);
    return oracle.getRandomNumber();
  }

  function getPotOfLotteryRound() public view returns (uint256) {
    return address(this).balance;
  }

  function drawWinners(address _oracleAddress, Mode _lotteryMode) public onlyOwner {
    lotteryState = State.Closed;

    winningNr = _lotteryMode == Mode.Prod ? getRandomNumberFromOracle(_oracleAddress) : winningNrDev;

    if (playersByTicket[winningNr].length > 0) {
      // Get the won amount per winner
      amountPerAddress = address(this).balance / playersByTicket[winningNr].length;

      for (uint32 i = 0; i < playersByTicket[winningNr].length; ++i){
        playersByTicket[winningNr][i].transfer(amountPerAddress);
      }
    }

    // Empty the mappings for a new round --> May move this to the state where a new round is opened.
  }

  // Used to print the winners in the frontend.
  function printWinnerAccount() public view returns (address payable[] memory) {
    return playersByTicket[winningNr];
  }

  // Emptying of the mappings and arrays, such that a new round can be started.
  function emptyMapping() private {

    // Delete the playersByTicket mapping
    for (uint256 i = 0; i < allPlayedNumbers.length; ++i){
      delete playersByTicket[allPlayedNumbers[i]];
    }

    // Delete the soldTickets mapping
    for (uint256 i = 0; i < allPlayers.length; ++i){
      delete soldTickets[allPlayers[i]];
    }

    // Delete the two helper arrays.
    delete allPlayedNumbers;
    delete allPlayers;
    amountPerAddress = 0;
  }
}

// Interface
contract RandomNumberGenerator {
  function getRandomNumber() public returns (uint32);
}
