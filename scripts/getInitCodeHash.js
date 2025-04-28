const { ethers } = require("hardhat");

async function main() {
    const factoryAddress = "0xC4E5b6f7e5cd88455d2DA4acfC2d4C6206f9C92C"; 

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
    ];

    const provider = new ethers.providers.JsonRpcProvider(process.env.URL);

    const factoryContract = new ethers.Contract(factoryAddress, factoryABI, provider);

    const initCodePairHash = await factoryContract.INIT_CODE_PAIR_HASH();

    console.log("✅ INIT_CODE_PAIR_HASH:", initCodePairHash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Lỗi:", error.message);
        process.exit(1);
    });

// npx hardhat run scripts/getInitCodeHash.js --network RiseChain