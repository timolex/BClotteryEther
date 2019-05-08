import SimpleStorage from "./contracts/SimpleStorage.json";
import ComplexStorage from "./contracts/ComplexStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";
import RandomNumberGenerator from "./contracts/RandomNumberGenerator.json";
import RandomNumberGenerator2 from "./contracts/RandomNumberGenerator2.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [SimpleStorage, ComplexStorage, TutorialToken, RandomNumberGenerator, RandomNumberGenerator2],
  events: {
    SimpleStorage: ["StorageSet"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
