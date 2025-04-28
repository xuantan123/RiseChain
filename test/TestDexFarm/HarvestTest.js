const { ethers } = require("ethers");
require("dotenv").config();

const testDexFarmAddress = "0x80155a8BD80036f21e515df8952Fec3FeE66e6C7";
const TTTAddress = "0x6746892382466aF4ba465c5Ff3F6379A92Fa922c"; // Thay bằng địa chỉ token chính xác

const testDexFarmABI = [
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_CAKE",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_burnAdmin",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "allocPoint",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "contract IERC20",
        "name": "lpToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isRegular",
        "type": "bool"
      }
    ],
    "name": "AddPool",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "EmergencyWithdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Init",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "allocPoint",
        "type": "uint256"
      }
    ],
    "name": "SetPool",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "boostContract",
        "type": "address"
      }
    ],
    "name": "UpdateBoostContract",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldMultiplier",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newMultiplier",
        "type": "uint256"
      }
    ],
    "name": "UpdateBoostMultiplier",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldAdmin",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "UpdateBurnAdmin",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "burnRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "regularFarmRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "specialFarmRate",
        "type": "uint256"
      }
    ],
    "name": "UpdateCakeRate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lastRewardTimestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lpSupply",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "accCakePerShare",
        "type": "uint256"
      }
    ],
    "name": "UpdatePool",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isValid",
        "type": "bool"
      }
    ],
    "name": "UpdateWhiteList",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ACC_CAKE_PRECISION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "BOOST_PRECISION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "CAKE",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "CAKE_RATE_TOTAL_PRECISION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MASTERCHEF_CAKE_PER_SECOND",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_BOOST_PRECISION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC20",
        "name": "_lpToken",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_isRegular",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
      }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "boostContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "burnAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
      }
    ],
    "name": "burnCake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cakePerBlockToBurn",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_isRegular",
        "type": "bool"
      }
    ],
    "name": "cakePerSecond",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cakeRateToBurn",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cakeRateToRegularFarm",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cakeRateToSpecialFarm",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "emergencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "getBoostMultiplier",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "harvestFromMasterChef",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastBurnedTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "lpToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "massUpdatePools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "pendingCake",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "poolInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "accCakePerShare",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastRewardTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalBoostedShare",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isRegular",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "pools",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
      }
    ],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalRegularAllocPoint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSpecialAllocPoint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newBoostContract",
        "type": "address"
      }
    ],
    "name": "updateBoostContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_newMultiplier",
        "type": "uint256"
      }
    ],
    "name": "updateBoostMultiplier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newAdmin",
        "type": "address"
      }
    ],
    "name": "updateBurnAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_burnRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_regularFarmRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_specialFarmRate",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
      }
    ],
    "name": "updateCakeRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "updatePool",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "accCakePerShare",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lastRewardTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "allocPoint",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalBoostedShare",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isRegular",
            "type": "bool"
          }
        ],
        "internalType": "struct testDEXFarm.PoolInfo",
        "name": "pool",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_isValid",
        "type": "bool"
      }
    ],
    "name": "updateWhiteList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "boostMultiplier",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "whiteList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const TTT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "initialOwner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Burn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "suspended",
        "type": "bool"
      }
    ],
    "name": "Suspended",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isListed",
        "type": "bool"
      }
    ],
    "name": "UpdateBlacklist",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "authorized",
        "type": "bool"
      }
    ],
    "name": "UpdateOperator",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isBlacklisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isSuspended",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "suspend_",
        "type": "bool"
      }
    ],
    "name": "suspend",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isListed",
        "type": "bool"
      }
    ],
    "name": "updateBlacklist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "authorized",
        "type": "bool"
      }
    ],
    "name": "updateOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const provider = new ethers.providers.JsonRpcProvider(process.env.URL); // Thay bằng RPC chính xác
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Thay bằng private key (hoặc dùng .env)
const signer = wallet.connect(provider);

async function testHarvest(pid, userAddress) {
    const testDexFarm = new ethers.Contract(testDexFarmAddress, testDexFarmABI, signer);
    const testDexToken = new ethers.Contract(TTTAddress, TTT_ABI, signer);
  
    console.log(`\n🔍 Kiểm tra Pending Rewards cho User: ${userAddress}`);
  
    // 1️⃣ Kiểm tra số dư token trước khi harvest
    const balanceBefore = await testDexToken.balanceOf(userAddress);
    console.log(`✅ Số dư trước khi Harvest: ${ethers.utils.formatUnits(balanceBefore, 18)} TTT`);
  
    // 2️⃣ Kiểm tra phần thưởng chưa harvest
    const pendingRewards = await testDexFarm.pendingCake(pid, userAddress);
    console.log(`🔍 Pending Rewards trước Harvest: ${ethers.utils.formatUnits(pendingRewards, 18)} TTT`);
    console.log(`testDexFarm Address đang dùng: ${testDexFarmAddress}`);
    console.log(`testDexToken Address đang dùng: ${TTTAddress}`);
    
    const totalSupply = await testDexToken.totalSupply();
console.log(`Total Supply: ${ethers.utils.formatUnits(totalSupply, 18)} TTT`);

const allowance = await testDexToken.allowance(userAddress, testDexFarmAddress);
console.log(`Allowance của testDexFarm: ${ethers.utils.formatUnits(allowance, 18)} TTT`);

const approveTx = await testDexToken.approve(testDexFarmAddress, ethers.utils.parseUnits("1000000", 18));
await approveTx.wait();
console.log("✅ Đã cấp quyền sử dụng TTT cho testDexFarm!");


// const transferTx = await testDexToken.transfer(testDexFarmAddress, ethers.utils.parseUnits("1000000", 18));
// await transferTx.wait();
// console.log("✅ Đã chuyển 1,000,000 TTT vào testDexFarm!");

    // 3️⃣ Kiểm tra hợp đồng có đủ token để trả thưởng không
    const contractBalanceBefore = await testDexToken.balanceOf("0x4d4812CA33e31761c60b7f9d4c7a7C2d39f4868B");
    console.log(`🔍 Số dư TTT trong contract trước Harvest: ${ethers.utils.formatUnits(contractBalanceBefore, 18)} TTT`);
  
    // 4️⃣ Thực hiện harvest
    if (pendingRewards.gt(0)) {
      console.log(`⏳ Harvesting rewards...`);
      const tx = await testDexFarm.deposit(pid, 0); // Gửi 0 LP token để kích hoạt harvest
      await tx.wait();
      console.log(`✅ Harvest thành công!`);
  
      // Chờ blockchain cập nhật
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      // 5️⃣ Kiểm tra số dư token sau khi harvest
      const balanceAfter = await testDexToken.balanceOf(userAddress);
      console.log(`✅ Số dư sau khi Harvest: ${ethers.utils.formatUnits(balanceAfter, 18)} TTT`);
  
      // 6️⃣ Kiểm tra lại pending rewards (nên về 0)
      const pendingAfter = await testDexFarm.pendingCake(pid, userAddress);
      console.log(`🔍 Pending Rewards sau Harvest: ${ethers.utils.formatUnits(pendingAfter, 18)} TTT`);
  
      // 7️⃣ Kiểm tra số dư của hợp đồng sau harvest
      const contractBalanceAfter = await testDexToken.balanceOf(testDexFarmAddress);
      console.log(`🔍 Số dư TTT trong contract sau Harvest: ${ethers.utils.formatUnits(contractBalanceAfter, 18)} TTT`);
  
      // 8️⃣ Kiểm tra số token thực tế nhận được
      const rewardReceived = balanceAfter.sub(balanceBefore);
      console.log(`🎉 Tổng số token nhận được sau Harvest: ${ethers.utils.formatUnits(rewardReceived, 18)} TTT`);
  
      // 9️⃣ So sánh với pendingRewards
      if (rewardReceived.eq(pendingRewards)) {
        console.log(`✅ Harvest thành công, đúng số lượng ${ethers.utils.formatUnits(rewardReceived, 18)} TTT`);
      } else {
        console.log(`⚠️ Harvest thành công nhưng số lượng token nhận được không khớp với pending rewards!`);
      }
    } else {
      console.log(`⚠️ Không có phần thưởng để Harvest.`);
    }
  }
  
const pid = 1;
const userAddress = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8"; // Thay bằng địa chỉ thực tế
testHarvest(pid, userAddress);


// npx hardhat run test/TestDexFarm/HarvestTest.js --network RiseChain