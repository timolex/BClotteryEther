import SimpleStorage from "./contracts/SimpleStorage.json";
import RandomNumberGenerator from "./contracts/RandomNumberGenerator.json"
import Lottery from "./contracts/Lottery.json"

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [SimpleStorage, RandomNumberGenerator, Lottery],
  events: {
    SimpleStorage: ["StorageSet"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
