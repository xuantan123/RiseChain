const { ethers } = require("ethers");
require("dotenv").config();

// Thông tin mạng và smart contract
const provider = new ethers.providers.JsonRpcProvider(process.env.URL); // RPC của ETHChain
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Thay PRIVATE_KEY bằng private key của bạn

const FACTORY_ADDRESS = "0xC4E5b6f7e5cd88455d2DA4acfC2d4C6206f9C92C"; // Địa chỉ Factory Contract
const ROUTER_ADDRESS = "0x8408A9FEe31a4B78632f27c1223b5574d6d68054"; // Địa chỉ Router Contract
const WETH = "0x701855ae3a8b2A989DC8ACCf02Dd2b96f8B21671"; // Địa chỉ WETH
const TOKEN_B = "0x6746892382466aF4ba465c5Ff3F6379A92Fa922c"; // Địa chỉ TTT


const factoryABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_feeToSetter",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token0",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "token1",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "pair",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "PairCreated",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "INIT_CODE_PAIR_HASH",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allPairs",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "allPairsLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      }
    ],
    "name": "createPair",
    "outputs": [
      {
        "internalType": "address",
        "name": "pair",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "feeTo",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "feeToSetter",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "getPair",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_feeTo",
        "type": "address"
      }
    ],
    "name": "setFeeTo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_feeToSetter",
        "type": "address"
      }
    ],
    "name": "setFeeToSetter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; // ABI của Factory Contract
const routerABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_WETH",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "WETH",
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
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountADesired",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountBDesired",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "addLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenDesired",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "addLiquidityETH",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
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
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveOut",
        "type": "uint256"
      }
    ],
    "name": "getAmountIn",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveOut",
        "type": "uint256"
      }
    ],
    "name": "getAmountOut",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }
    ],
    "name": "getAmountsIn",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }
    ],
    "name": "getAmountsOut",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveB",
        "type": "uint256"
      }
    ],
    "name": "quote",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "removeLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "removeLiquidityETH",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "removeLiquidityETHWithPermit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountETHMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountETH",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "removeLiquidityWithPermit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapETHForExactTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactETHForTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForETH",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountInMax",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapTokensForExactETH",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountInMax",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapTokensForExactTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];  // ABI của Router Contract
const WETH_ABI = [
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "src",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "guy",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "wad",
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
              "name": "dst",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "wad",
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
              "name": "src",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "dst",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "wad",
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
              "indexed": true,
              "internalType": "address",
              "name": "src",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "Withdrawal",
      "type": "event"
  },
  {
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "",
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
              "name": "guy",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "wad",
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
              "name": "",
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
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
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
              "name": "dst",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "wad",
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
              "name": "src",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "dst",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "wad",
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
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "stateMutability": "payable",
      "type": "receive"
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
const factoryContract = new ethers.Contract(FACTORY_ADDRESS, factoryABI, signer);
const routerContract = new ethers.Contract(ROUTER_ADDRESS, routerABI, signer);
const tokenContractA = new ethers.Contract(WETH, WETH_ABI, signer);
const tokenContractB = new ethers.Contract(TOKEN_B, TTT_ABI, signer);

async function checkOrCreatePair() {
    console.log("\n🔍 Kiểm tra cặp thanh khoản WETH-TTT...");

    const pairAddress = await factoryContract.getPair(WETH, TOKEN_B);
    console.log(`📌 Địa chỉ cặp: ${pairAddress}`);

    if (pairAddress === ethers.constants.AddressZero) {
        console.log("⚠️ Cặp thanh khoản chưa tồn tại. Đang tạo cặp...");
        try {
            const tx = await factoryContract.createPair(WETH, TOKEN_B);
            console.log(`📌 Giao dịch tạo cặp đang chờ xác nhận: ${tx.hash}`);
            await tx.wait();
            console.log("✅ Cặp thanh khoản đã được tạo thành công!");
        } catch (error) {
            console.error("❌ Lỗi khi tạo cặp thanh khoản:", error);
        }
    } else {
        console.log("✅ Cặp thanh khoản đã tồn tại!");
    }
}

async function approveTokens() {
    console.log("\n🛠 Kiểm tra & cấp quyền cho Router...");

    const amount = ethers.constants.MaxUint256;
    const userAddress = await signer.getAddress();

    // Kiểm tra & cấp quyền cho WETH (WETH)
    let allowanceA = await tokenContractA.allowance(userAddress, ROUTER_ADDRESS);
    console.log(`🔎 Quyền hạn hiện tại của WETH: ${allowanceA.toString()}`);

    if (allowanceA.lt(amount)) {
        console.log("🔄 Đang approve WETH...");
        try {
            let txA = await tokenContractA.approve(ROUTER_ADDRESS, amount);
            console.log(`📌 Giao dịch approve WETH: ${txA.hash}`);
            await txA.wait();
            console.log("✅ WETH đã được cấp quyền!");
        } catch (error) {
            console.error("❌ Lỗi khi approve WETH:", error);
        }
    } else {
        console.log("✅ WETH đã được approve sẵn!");
    }

    // Kiểm tra & cấp quyền cho TOKEN_B (TTT)
    let allowanceB = await tokenContractB.allowance(userAddress, ROUTER_ADDRESS);
    console.log(`🔎 Quyền hạn hiện tại của TTT: ${allowanceB.toString()}`);

    if (allowanceB.lt(amount)) {
        console.log("🔄 Đang approve TTT...");
        try {
            let txB = await tokenContractB.approve(ROUTER_ADDRESS, amount);
            console.log(`📌 Giao dịch approve TTT: ${txB.hash}`);
            await txB.wait();
            console.log("✅ TTT đã được cấp quyền!");
        } catch (error) {
            console.error("❌ Lỗi khi approve TTT:", error);
        }
    } else {
        console.log("✅ TTT đã được approve sẵn!");
    }
}

async function checkTokenBalances() {
    console.log("\n💰 Kiểm tra số dư token...");
    const userAddress = await signer.getAddress();
    
    const balanceA = await tokenContractA.balanceOf(userAddress);
    const balanceB = await tokenContractB.balanceOf(userAddress);
    
    console.log(`📌 Số dư WETH: ${ethers.utils.formatUnits(balanceA, 18)}`);
    console.log(`📌 Số dư TTT: ${ethers.utils.formatUnits(balanceB, 18)}`);
    
    const amountA = ethers.utils.parseUnits("0.000001", 18);
    const amountB = ethers.utils.parseUnits("1000", 18);
    
    if (balanceA.lt(amountA)) {
        console.error(`❌ Không đủ WETH. Cần: ${ethers.utils.formatUnits(amountA, 18)}, Có: ${ethers.utils.formatUnits(balanceA, 18)}`);
        return false;
    }
    
    if (balanceB.lt(amountB)) {
        console.error(`❌ Không đủ TTT. Cần: ${ethers.utils.formatUnits(amountB, 18)}, Có: ${ethers.utils.formatUnits(balanceB, 18)}`);
        return false;
    }
    
    return true;
}

async function swapETHForExactTokens() {
    console.log("\n🔄 Thực hiện swap ETH for exact tokens...");

    const userAddress = await signer.getAddress();
    const amountOut = ethers.utils.parseUnits("100", 18);  // Số lượng token bạn muốn nhận
    const path = [WETH, TOKEN_B];  // Đường dẫn từ WETH đến token đích (ví dụ: TTT)
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;  // Hạn chót (10 phút từ bây giờ)

    try {
        // Lấy số lượng ETH cần thiết để swap
        const amountsIn = await routerContract.getAmountsIn(amountOut, path);
        const amountETHIn = amountsIn[0];
        console.log(`📌 Cần ETH: ${ethers.utils.formatUnits(amountETHIn, 18)} ETH`);

        // Kiểm tra số dư ETH người dùng có
        const balanceETH = await provider.getBalance(userAddress);
        console.log(`📌 Số dư ETH hiện tại: ${ethers.utils.formatUnits(balanceETH, 18)} ETH`);

        if (balanceETH.lt(amountETHIn)) {
            console.error("❌ Số dư ETH không đủ!");
            return;
        }

        // Cấp phép cho router nếu chưa làm
        const allowance = await tokenContractA.allowance(userAddress, ROUTER_ADDRESS);
        if (allowance.lt(amountETHIn)) {
            console.log("🔄 Cấp phép ETH cho Router...");
            const tx = await tokenContractA.approve(ROUTER_ADDRESS, amountETHIn);
            console.log(`📌 Giao dịch approve: ${tx.hash}`);
            await tx.wait();
            console.log("✅ ETH đã được approve!");
        }

        // Thực hiện swap
        const tx = await routerContract.swapExactETHForTokens(
            amountOut,
            path,
            userAddress,
            deadline,
            {
                value: amountETHIn,
                gasLimit: 1000000,
                gasPrice: ethers.utils.parseUnits("10", "gwei"),
            }
        );

        console.log(`📌 Giao dịch swap đang chờ xác nhận: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`✅ Giao dịch thành công! Block Number: ${receipt.blockNumber}`);
        console.log("✅ Swap đã được thực hiện thành công!");
    } catch (error) {
        console.error("❌ Lỗi khi swap:", error);
    }
}

async function main() {
    try {
        await checkOrCreatePair();
        await approveTokens();

        const success = await checkTokenBalances();
        if (!success) {
            console.log("❌ Kiểm tra số dư thất bại. Dừng quá trình.");
            return;
        }
        
        await swapETHForExactTokens();
    } catch (error) {
        console.error("❌ Lỗi chính:", error.message);
    }
}

main();


// npx hardhat run test/SwapToken/SwapToken.js --network RiseChain