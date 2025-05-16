/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
const { ethers } = require("ethers");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.6.6",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.7.0",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.8.4",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.4.18",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.8.0",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.8.20",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.8.18",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
     ],
  },
  networks: {
    RiseChain: {
      url: process.env.URL ,
      accounts: [process.env.PRIVATE_KEY] ,
      chainId: 11155931,
    },
  },
  etherscan: {
    apiKey: {
      'rise-testnet': 'empty'
    },
    customChains: [
      {
        network: "rise-testnet",
        chainId: 11155931,
        urls: {
          apiURL: "https://explorer.testnet.riselabs.xyz/api",
          browserURL: "https://explorer.testnet.riselabs.xyz"
        }
      }
    ]
  }
};
