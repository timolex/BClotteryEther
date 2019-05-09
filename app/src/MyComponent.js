import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import logo from "./logo.png";

export default ({ accounts }) => (
  <div className="App">
    <div>
      <img src={logo} alt="drizzle-logo" />
      <h1>Drizzle Examples</h1>
      <p>Examples of how to get started with Drizzle in various situations.</p>
    </div>

    <div className="section">
      <h2>Active Account</h2>
      <AccountData accountIndex="0" units="ether" precision="3" />
    </div>

    <div className="section">
      <h2>SimpleStorage</h2>
      <p>
        This shows a simple ContractData component with no arguments, along with
        a form to set its value.
      </p>
      <p>
        <strong>Stored Value: </strong>
        <ContractData contract="SimpleStorage" method="storedData" />
        <ContractData contract="SimpleStorage" method="storedNumber" />
      </p>
      <ContractForm contract="SimpleStorage" method="set" />
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
      <p>LotteryTest: Get number 5 back as defined number</p>
      <p>
        <strong>Defined Number: </strong>

        <ContractData contract="Lottery" method="randNr" />
      </p>
      <ContractForm contract="Lottery" method="getDefinedNumber" />
    </div>

  </div>
);
