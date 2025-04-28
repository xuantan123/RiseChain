const { ethers } = require("hardhat");

const testDexFarmAddress = "0x80155a8BD80036f21e515df8952Fec3FeE66e6C7"; //contract Farm
const lpTokenAddress = "0x8fcE7aBF8e1F442b00C580b84F1Bb99e13dB1DF5"; //contract Pair

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
const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
]; 

async function main() {
  const [signer] = await ethers.getSigners();
  const testDexFarm = new ethers.Contract(testDexFarmAddress, testDexFarmABI, signer);
  const lpToken = new ethers.Contract(lpTokenAddress, ERC20_ABI, signer);

  let totalPools = await testDexFarm.poolLength();
  console.log(`🔍 Total Pools Available: ${totalPools.toString()}`);

  const isWhitelisted = await testDexFarm.whiteList(signer.address);
  console.log(`🔍 Are you on the whitelist? ${isWhitelisted}`);

  if (!isWhitelisted) {
    console.log("⏳ Adding to whitelist...");
    let tx = await testDexFarm.updateWhiteList(signer.address, true);
    await tx.wait();
    console.log("✅ Added to whitelist!");
  }

  // Thêm pool cho đến khi có ít nhất 2 pool
  while (totalPools.toNumber() < 2) {
    console.log("⏳ Adding new pool...");
    let tx = await testDexFarm.add(1, lpTokenAddress, true, false);
    await tx.wait();
    console.log("✅ New Pool has been added!");

    // Cập nhật lại totalPools
    totalPools = await testDexFarm.poolLength();
    console.log(`🔍 Total Pools after adding: ${totalPools.toString()}`);
  }

  const pid = 1; // Đặt cố định pid = 1
  console.log(`🔍 Checking Pool #${pid} Info...`);

  console.log(`⏳ Updating allocPoint of Pool #${pid} to 20...`);
  let tx = await testDexFarm.set(pid, 20, true);
  await tx.wait();
  console.log("✅ allocPoint updated to 20!");

  const pool = await testDexFarm.poolInfo(pid);
  console.log("pid:",pid);
  console.log(`   🟢 allocPoint: ${pool.allocPoint.toString()}`);
  console.log(`   🟢 lastRewardTimestamp: ${pool.lastRewardTimestamp.toString()}`);
  console.log(`   🟢 accCakePerShare: ${pool.accCakePerShare.toString()}`);
  console.log(`   🟢 totalBoostedShare: ${pool.totalBoostedShare.toString()}`);
  console.log(`   🟢 isRegular: ${pool.isRegular}`);

  console.log("⏳ Checking Boost Multiplier...");
  let boostMultiplier = await testDexFarm.getBoostMultiplier(signer.address, pid);
  console.log(`✅ Boost Multiplier: ${boostMultiplier.toString()}`);

  const amount = ethers.utils.parseUnits("0.0001", 18);
  console.log(`⏳ Granting permission to send ${ethers.utils.formatUnits(amount, 18)} LP Token into testDexFarm...`);
  tx = await lpToken.approve(testDexFarmAddress, amount);
  await tx.wait();
  console.log("✅ Permission granted!");
  let farmBalance = await lpToken.balanceOf(testDexFarmAddress);
  console.log(`📦 LP Token Balance in Farm: ${ethers.utils.formatUnits(farmBalance, 18)}`);


  console.log("⏳ Sending LP tokens to farm...");
  tx = await testDexFarm.deposit(pid, amount, {
    gasLimit: 1000000,
    gasPrice: ethers.utils.parseUnits("10", "gwei"),
  });
  await tx.wait();
  console.log("✅ Sent successfully!");

  console.log("⏳ Checking Pool Data after deposit...");
}


main().catch((error) => {
  console.error("❌ Lỗi:", error);
});


// npx hardhat run test/testDexFarm/testDexFarm.deposit.js --network RiseChain 