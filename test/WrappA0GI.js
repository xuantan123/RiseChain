const { ethers } = require("ethers");
const { network } = require("hardhat");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.URL);

const privateKey = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(privateKey, provider);

// 🏦 Địa chỉ hợp đồng WETH (Token ERC-20)
const WETHContractAddress = "0x701855ae3a8b2A989DC8ACCf02Dd2b96f8B21671"; 

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
const WETHContract = new ethers.Contract(WETHContractAddress, WETH_ABI, wallet);

async function wrapA0GI(amount) {
    try {
        console.log(`🔄 Wrapping ${ethers.utils.formatEther(amount)} ETH to WETH...`);

        // 📝 Gửi giao dịch để wrap ETH thành WETH
        const tx = await WETHContract.deposit({ value: amount });
        console.log(`📜 Giao dịch gửi đi: ${tx.hash}`);

        // ⏳ Chờ giao dịch được xác nhận
        await tx.wait();
        console.log("✅ ETH đã được wrap thành WETH thành công!");

    } catch (error) {
        console.error("❌ Lỗi wrap ETH:", error);
    }
}
  
// 💰 Nhập số lượng ETH muốn wrap (Ví dụ: 0.1 ETH)
const amountToWrap = ethers.utils.parseEther("0.0001"); // 0.1 ETH

// 🚀 Thực hiện wrap ETH -> WETH
wrapA0GI(amountToWrap);


// npx hardhat run test/WrappA0GI.js --network RiseChain