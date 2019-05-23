import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  state = {
    isOwner: null,
    dataKeyLotteryState: null // 0: closed, 1: open
  }

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
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

  drawWinners(lotteryMode) {
    // Get address of random number generator smart contract
    let randomNumberGeneratorAddress = null;
    if (this.props.drizzleStatus.initialized) {
      randomNumberGeneratorAddress = this.contracts.RandomNumberGenerator.address;
    }
    // Call lottery contract
    this.contracts.Lottery.methods.drawWinners(randomNumberGeneratorAddress, lotteryMode).send();
  }

  render() {
    // Get lotteryState from cache
    let lotteryState = 0;
    if (this.props.Lottery.lotteryState[this.state.dataKeyLotteryState]) {
      lotteryState = this.props.Lottery.lotteryState[this.state.dataKeyLotteryState].value;
    }

    return (
      <div className="App">
        <div>
          <h1>Blockchain Lottery</h1>
        </div>

        <div id="JackPot">
          <div>
            <h3>Jackpot</h3>
            <ContractData
              contract="Lottery"
              method="getPotOfLotteryRound"
              hideIndicator="true"
              render={displayData => {
                  return (<p>{this.web3.utils.fromWei(displayData.toString(), "ether")} ETH</p>);
              }}
            />
          </div>
        </div>

        <div id="Options">
        {this.state.isOwner &&
          <div>
            <h2>Options</h2>
            {lotteryState === "1" &&
            <div>
            <p>
              <button class="Button" onClick={this.drawWinners.bind(this, 0)}>Draw Winners</button>
            </p>
            <p>
              <button class="Button"  onClick={this.drawWinners.bind(this, 1)}>Draw Winners (DEV)</button>
            </p>
            </div>
            }
            {lotteryState === "0" &&
              <div>
                <p id="Winners">Winners:</p>
                <ContractData contract="Lottery" method="printWinnerAccount" hideIndicator="true"/>
                <p  id="AmountWon">
                  Amount won:&nbsp;
                  <ContractData
                    contract="Lottery"
                    method="amountPerAddress"
                    hideIndicator="true"
                    render={displayData => {
                        return (<p>{this.web3.utils.fromWei(displayData.toString(), "ether")} ETH</p>);
                    }}
                  />
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
        {!this.state.isOwner &&
          <div>
            <p> This is the blockchain lottery of team Ether.  </p>
          </div>
        }
        </div>

        <div id="Lottery">
          <h3>Lottery</h3>
            {lotteryState === "0" &&
             <div>
               <h2>is closed</h2>
               <p>Last lottery draw winning number:</p>
               <ContractData id="winningNr" contract="Lottery" method="winningNr" hideIndicator="true" />
               <p/>
             </div>
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
            <h2> Your lottery tickets:</h2>
            <div id="LotteryNumbers">
              <ul>
                  <ContractData contract="Lottery" method="getOwnTickets" hideIndicator="true" />
              </ul>
            </div>
          </div>
          }
        </div>

      <div id="ActiveAccount">
          <h3>Active Account</h3>
          <AccountData accountIndex="0" units="ether" precision="3" />
        </div>

      </div>
    );
  }
}

MyComponent.contextTypes = {
  drizzle: PropTypes.object
}

export default MyComponent;
