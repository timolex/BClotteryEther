import MyComponent from "./MyComponent";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    RandomNumberGenerator: state.contracts.RandomNumberGenerator,
    Lottery: state.contracts.Lottery,
    drizzleStatus: state.drizzleStatus,
  };
};

const MyContainer = drizzleConnect(MyComponent, mapStateToProps);

export default MyContainer;
