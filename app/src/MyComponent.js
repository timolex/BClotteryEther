import React from "react";
import PropTypes from 'prop-types'
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import logo from "./logo.png";

class MyComponent extends React.Component {

  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts
  }

  render() {

    let randomNumberGeneratorAddress =
      this.props.drizzleStatus.initialized ?
      this.contracts.RandomNumberGenerator.address :
      'Address not found';

    return (
      <div className="App">
        <div>
          <img src={logo} alt="drizzle-logo" />
          <h1>BlockchainLottery Group Ether</h1>
        </div>

        <div className="section">
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />
        </div>

        <div className="section">
          <h2>RandomNumberGenerator</h2>
          <p>Generate a random number.</p>
          <p>
            <strong>Random Number: </strong>

            <ContractData contract="RandomNumberGenerator" method="randNr" />
          </p>
          <ContractForm contract="RandomNumberGenerator" method="getRandomNumber" />
        </div>

        <div className="section">
          <h2>Lottery</h2>
          <p>Choose a number for the lottery (1 Ether):</p>
          <ContractForm contract="Lottery" method="buyTicket" sendArgs={{value: 1000000000000000000}} render={({ inputs, inputTypes, state, handleInputChange, handleSubmit })=> (
            <form onSubmit={handleSubmit}>
              {inputs.map((input, index) => (
              <>
                <input style={{ fontSize: 18, width: 80}} key={input.name} type={inputTypes[index]} name={input.name} value={state[input.name]} placeholder="Number" onChange={handleInputChange} min="1" max="250" />
                <button style={{ marginLeft: 10}} key="submit" type="button" onClick={handleSubmit}>
                  Enter
                </button>
              </>
              ))}
            </form>
            )}
            />

            <p> Your lottery tickets:</p>
            <ContractData contract="Lottery" method="getOwnTickets" />
        </div>

        <div className="section">
          <h2>Pot</h2>
          <p>Amount of the jackpot (Ether):&nbsp;
            <ContractData contract="Lottery" method="getPotOfLotteryRound" />
          </p>
        </div>

        <div className="section">
          <h2>Winners</h2>
          <p>End Game and determine Winner: &nbsp;
            <ContractForm contract="Lottery" method="getWinners" />
          </p>
          <p>Winners:&nbsp;
            <ContractData contract="Lottery" method="printWinnerAccount" />
          </p>
          <p>Amount won:&nbsp;
            <ContractData contract="Lottery" method="amountPerAddress" />
          </p>
        </div>
      </div>
    );
  }
}

MyComponent.contextTypes = {
  drizzle: PropTypes.object
}

export default MyComponent;
