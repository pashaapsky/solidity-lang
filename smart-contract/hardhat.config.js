// https://eth-ropsten.alchemyapi.io/v2/5uBp3nNJDx_O2Zwe198Jjim4Ao8t6-5W

//smart contracts plugin
require("@nomiclabs/hardhat-waffle");
//verify contracts Etherscan
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const ALCHEMY_MAINNET_FORK_API_URL =
  "https://eth-mainnet.alchemyapi.io/v2/gIuOz3g7EgE5HwC6HrPlHDkwd0dsK7T_";
const ALCHEMY_ROPSTEN_API_URL =
  "https://eth-ropsten.alchemyapi.io/v2/76QZf78fBa-s_8XXhsTGbcGT2MZketRp";
const ALCHEMY_RINKEBY_API_URL =
  "https://eth-rinkeby.alchemyapi.io/v2/76QZf78fBa-s_8XXhsTGbcGT2MZketRp";
const INFURA_ROPSTEN_API_URL =
  "https://ropsten.infura.io/v3/70531acb06884e5e87f1d9da3e58adc4";

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  testnet: {
    rinkeby: {
      ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
  },
  networks: {
    hardhat: {
      // chainId: 1337,
      forking: {
        url: ALCHEMY_MAINNET_FORK_API_URL,
        // blockNumber: 11095000
      },
      ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    ropsten: {
      url: ALCHEMY_ROPSTEN_API_URL,
      accounts: [process.env.META_MASK_AC1_KEY, process.env.META_MASK_AC2_KEY],
      ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
    rinkeby: {
      url: ALCHEMY_RINKEBY_API_URL,
      accounts: [process.env.META_MASK_AC1_KEY, process.env.META_MASK_AC2_KEY],
      //можно считать переменную через hre.config
      ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
  },
  mocha: {
    timeout: 100000,
  },
  etherscan: {
    apiKey: process.env.ETHER_SCAN_API_KEY,
  },
  plugins: ["solidity-coverage"],
};
