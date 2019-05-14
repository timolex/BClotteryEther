import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import PropTypes from 'prop-types'

import logo from "./logo.png";

class MyComponent extends React.Component {

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      isOwner: false
    }
    this.setIsOwner();
  }

  setIsOwner() {
    this.contracts.Lottery.methods.owner().call( (err, res) => {
      this.setState({
        isOwner: this.props.accounts[0] === res
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.accounts[0] !== prevProps.accounts[0]) {
      this.setIsOwner();
    }
  }

  drawWinners() {
    // Get address of random number generator smart contract
    let randomNumberGeneratorAddress = null;
    if (this.props.drizzleStatus.initialized) {
      randomNumberGeneratorAddress = this.contracts.RandomNumberGenerator.address;
    }
    // Call lottery contract
    this.contracts.Lottery.methods.drawWinners(randomNumberGeneratorAddress).send();
  }

  render() {
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
          <h2>Lottery</h2>
          <p>Choose a number for the lottery (1 Ether):</p>
          <ContractForm
            contract="Lottery"
            method="buyTicket"
            sendArgs={{value: 1000000000000000000}}
            render={({ inputs, inputTypes, state, handleInputChange, handleSubmit })=> (
              <form onSubmit={handleSubmit}>
                {inputs.map((input, index) => (
                  <>
                  <input
                    style={{ fontSize: 18, width: 80}}
                    key={input.name} type={inputTypes[index]}
                    name={input.name}
                    value={state[input.name]}
                    placeholder="Number"
                    onChange={handleInputChange}
                    min="1"
                    max="250"
                  />
                  <button
                    style={{ marginLeft: 10}}
                    key="submit"
                    type="button"
                    onClick={handleSubmit}
                    >
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
          <h3>Pot</h3>
          <p>Amount of the jackpot (Ether):&nbsp;
            <ContractData contract="Lottery" method="getPotOfLotteryRound" />
          </p>
        </div>

        {this.state.isOwner &&
          <div className="section">
            <h3>Winners</h3>
            <p>
              <button onClick={this.drawWinners.bind(this)}>Draw Winners</button>
            </p>
            <p>Winners:&nbsp;
              <ContractData contract="Lottery" method="printWinnerAccount" />
            </p>
            <p>Amount won:&nbsp;
              <ContractData contract="Lottery" method="amountPerAddress" />
            </p>
          </div>
        }

      </div>
    );
  }
}


MyComponent.contextTypes = {
  drizzle: PropTypes.object
}

export default MyComponent;
