import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import PropTypes from 'prop-types'

import logo from "./logo.png";

class MyComponent extends React.Component {
  state = {
    isOwner: null,
    dataKeyLotteryState: null // 0: closed, 1: open
  }

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
  }

  componentDidMount() {
    this.setIsOwner();
    // Subscribe to lotteryState
    const dataKeyLotteryState = this.contracts.Lottery.methods.lotteryState.cacheCall();
    this.setState({ dataKeyLotteryState });
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
    // Get lotteryState from cache
    let lotteryState = 0;
    if (this.props.Lottery.lotteryState[this.state.dataKeyLotteryState]) {
      lotteryState = this.props.Lottery.lotteryState[this.state.dataKeyLotteryState].value;
    }

    return (
      <div className="App" >
        <div>
          <h1>BlockchainLottery Group Ether</h1>
        </div>

        <div id="JackPot">
          <div>
            <h3>Jackpot</h3>
            <p><ContractData contract="Lottery" method="getPotOfLotteryRound" hideIndicator="true"/> Ether</p>
          </div>
        </div>

        <div id="Options">
        {this.state.isOwner &&
          <div>
            <h3>Options</h3>
            {lotteryState === "1" &&
              <p>
                <button class="Button" onClick={this.drawWinners.bind(this)}>Draw Winners</button>
              </p>
            }
            {lotteryState === "0" &&
              <div>
                <p>Winners:</p>
                <ContractData contract="Lottery" method="printWinnerAccount" hideIndicator="true"/>
                <p>
                  Amount won:&nbsp;
                  <ContractData contract="Lottery" method="amountPerAddress" hideIndicator="true"/>
                </p>
                <p>
                  <ContractForm
                    contract="Lottery"
                    method="openLottery"
                    hideIndicator="true"
                    render={({ inputs, inputTypes, state, handleInputChange, handleSubmit })=> (
                      <form onSubmit={handleSubmit}>
                          <div>
                          <button
                            class="Button"
                            style={{ width: 130, height: 28, fontSize: 14}}
                            key="submit"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Reopen Lottery
                          </button>
                          </div>
                      </form>
                    )} />
                </p>
              </div>
            }
          </div>
        }
        </div>

        <div className="section" id="ActiveAccount">
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />
        </div>

        <div className="section" id="Lottery">
          <h2>Lottery</h2>
          {lotteryState === "0" &&
            <h3>is closed</h3>
          }
          {lotteryState === "1" &&
          <div>
            <p>Choose a number for the lottery (1 Ether):</p>
            <ContractForm
              contract="Lottery"
              method="buyTicket"
              sendArgs={{value: 1000000000000000000}}
              render={({ inputs, inputTypes, state, handleInputChange, handleSubmit })=> (
                <form onSubmit={handleSubmit}>
                  {inputs.map((input, index) => (
                    <div>
                    <input
                      class="Input"
                      style={{ fontSize: 18, width:100}}
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
                      class="Button"
                      onClick={handleSubmit}
                      >
                      Enter
                    </button>
                    </div>
                  ))}
                </form>
              )}
            />
            <p> Your lottery tickets:</p>
            <ContractData contract="Lottery" method="getOwnTickets" hideIndicator="true" />
          </div>
          }
        </div>
      </div>
    );
  }
}


MyComponent.contextTypes = {
  drizzle: PropTypes.object
}

export default MyComponent;
